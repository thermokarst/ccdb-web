import Ember from 'ember';
import Changeset from 'ember-changeset';

const { Component } = Ember;

export default Component.extend({
  init() {
    this._super(...arguments);
    const model = this.get('model');
    this.set('changeset', new Changeset(model));
  },
});
