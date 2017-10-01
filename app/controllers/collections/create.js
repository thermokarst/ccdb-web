import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    onSave(changeset) {
      changeset.save();
      this.transitionToRoute('collections.index');
    },
    onCancel(changeset) {
      changeset.rollback();
      this.transitionToRoute('collections.index');
    },
  },
});
