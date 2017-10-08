import Ember from 'ember';
import CollectionValidations from '../../../validations/collection';
import { schema } from '../../../models/collection';
import ValidationMixin from '../../../mixins/validation';

const { Controller } = Ember;

export default Controller.extend(ValidationMixin, {
  CollectionValidations,

  actions: {
    onSave(changeset) {
      const postSave = () => {
        // Use the model's ID here because of the ArrayProxy in the route
        this.transitionToRoute('collections.detail', this.get('model.id'));
      };
      return this.validationSave(changeset, schema, postSave);
    },
    onCancel(changeset) {
      const postCancel = () => {
        // Use the model's ID here because of the ArrayProxy in the route
        return this.transitionToRoute('collections.detail', this.get('model.id'));
      };
      return this.validationCancel(changeset, postCancel);
    },
  },
});
