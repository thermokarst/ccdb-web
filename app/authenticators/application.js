import { Promise } from 'rsvp';
import $ from 'jquery';
import { get } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import config from '../config/environment';

export default BaseAuthenticator.extend({
  serverTokenEndpoint: `${config.APP.API_HOST}/api/auth/login/`,
  tokenAttributeName: 'data.attributes.auth-token',
  identificationAttributeName: 'username',
  verificationAttributeName: 'password',

  restore(data) {
    const tokenAttributeName = this.get('tokenAttributeName');
    const tokenAttribute = get(data, tokenAttributeName);

    if (!isEmpty(tokenAttribute)) {
      return Promise.resolve(data);
    } else {
      return Promise.reject();
    }
  },

  authenticate(username, password) {
    return new Promise((resolve, reject) => {
      const { identificationAttributeName: id, verificationAttributeName: verify } = this.getProperties('identificationAttributeName', 'verificationAttributeName');
      const data = {};
      data[id] = username;
      data[verify] = password;
      return this.makeRequest(data).then(
        (response) => run(null, resolve, response),
        (xhr) => run(null, reject, xhr.responseJSON || xhr.responseText)
      );
    });
  },

  invalidate() {
    return Promise.resolve();
  },

  makeRequest(data, options) {
    const serverTokenEndpoint = this.get('serverTokenEndpoint');
    const requestOptions = $.extend({}, {
      url: serverTokenEndpoint,
      type: 'POST',
      data,
    }, options || {});
    return $.ajax(requestOptions);
  },
});
