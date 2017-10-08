import Ember from 'ember';
import CollectionValidations from 'ccdb-web/validations/collection';
import { schema } from 'ccdb-web/models/collection';
import ValidationMixin from 'ccdb-web/mixins/validation';

const { Controller } = Ember;

export default Controller.extend(ValidationMixin, {
  CollectionValidations,

  actions: {
    onSave(changeset) {
      const postSave = () => { this.transitionToRoute('collections.index'); };
      return this.validationSave(changeset, schema, postSave);
    },
    onCancel(changeset) {
      const postCancel = () => { this.transitionToRoute('collections.index'); };
      return this.validationCancel(changeset, postCancel);
    },
  },
});
