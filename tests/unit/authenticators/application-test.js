import $ from 'jquery';
import { moduleFor, test } from 'ember-qunit';
import sinon from 'sinon';

moduleFor('authenticator:application', 'Unit | application', {
  unit: true,
});


test('should restore session when token is present', function(assert) {
  assert.expect(1);
  const authenticator = this.subject();
  const data = {data: {attributes: {'auth-token': 'foo'}}};
  return authenticator.restore(data).then((obs) => {
    assert.equal(obs, data);
  });
});

test('should not restore session when token is absent', function(assert) {
  assert.expect(1);
  const authenticator = this.subject();
  const data = {data: {token: ''}};
  return authenticator.restore(data).catch(() => {
    assert.ok(true);
  });
});

test('`invalidate` should invalidate the session', function(assert) {
  assert.expect(1);
  const authenticator = this.subject();
  return authenticator.invalidate().then(() => {
    assert.ok(true);
  });
});

test('`makeRequest` should make a request', function(assert) {
  assert.expect(2);
  const stub = sinon.stub($, 'ajax');
  stub.resolves(42);
  const authenticator = this.subject();
  authenticator.set('serverTokenEndpoint', 'foo')
  const promise = authenticator.makeRequest({bar: 'baz'}).then((d) => {
    assert.equal(d, 42);
  });
  assert.ok($.ajax.calledWithMatch({url: 'foo', data: {bar: 'baz'}}));
  $.ajax.restore();
  return promise;
});

test('authenticate should craft a nice payload', function(assert) {
  assert.expect(2);
  const stub = sinon.stub($, 'ajax');
  stub.resolves(42);
  const authenticator = this.subject();
  authenticator.set('serverTokenEndpoint', 'foo')
  const promise = authenticator.authenticate('myusername', 'mypassword').then((d) => {
    assert.equal(d, 42);
  });
  assert.ok($.ajax.calledWithMatch({url: 'foo', data: {username: 'myusername', password: 'mypassword'}}));
  $.ajax.restore();
  return promise;
});
