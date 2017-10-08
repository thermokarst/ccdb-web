import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    editCollection() {
      this.transitionToRoute('collections.detail.edit', this.get('model'));
    },
  },
});
