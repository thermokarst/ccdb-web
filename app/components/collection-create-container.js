import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);
    const model = this.get('model');
    const validations = this.get('validations');
    this.set('changeset', new Changeset(model, lookupValidator(validations), validations));
  },
});
