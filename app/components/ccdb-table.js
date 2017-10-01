import Ember from 'ember';
import Table from 'ember-light-table';

const { Component } = Ember;

export default Component.extend({
  // ARGS
  model: null,
  columns: null,

  table: null,
  didReceiveAttrs() {
    this._super(...arguments);
    const table = new Table(this.get('columns'), this.get('model'));
    this.set('table', table);
  },
});
