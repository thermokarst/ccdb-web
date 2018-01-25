import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    editCollection() {
      this.transitionToRoute('collections.detail.edit', this.get('model'));
    },
  },
});
