import Ember from 'ember';
import CollectionValidations from 'ccdb-web/validations/collection';
import CollectionSpeciesValidations from 'ccdb-web/validations/collection-species';
import CollectionMeasurementValidations from 'ccdb-web/validations/collection-measurement';
import DatasheetValidations from 'ccdb-web/validations/datasheet';
import ValidationMixin from 'ccdb-web/mixins/validation';

const { Controller, computed } = Ember;

export default Controller.extend(ValidationMixin, {
  CollectionValidations,
  CollectionSpeciesValidations,
  DatasheetValidations,
  CollectionMeasurementValidations,

  hasMany: ['collectionSpecies', 'datasheets', 'envMeasurements'],

  options: computed('projectOptions', 'studyLocationOptions',
                    'collectionTypeOptions', 'collectionMethodOptions',
                    'speciesOptions', 'adfgPermitOptions', function() {
    return {
      projects: this.get('projectOptions'),
      studyLocations: this.get('studyLocationOptions'),
      collectionTypes: this.get('collectionTypeOptions'),
      collectionMethods: this.get('collectionMethodOptions'),
      species: this.get('speciesOptions'),
      adfgPermits: this.get('adfgPermitOptions'),
    };
  }),

  actions: {
    onSave(changesets) {
      const postSave = () => {
        // Use the model's ID here because of the ArrayProxy in the route
        this.transitionToRoute('collections.detail', this.get('model.id'));
      };
      return this.transitionToRoute('loading').then(() => {
        return this.validationSave(changesets, postSave);
      });
    },
    onCancel(changesets) {
      const postCancel = () => {
        // Use the model's ID here because of the ArrayProxy in the route
        return this.transitionToRoute('collections.detail', this.get('model.id'));
      };
      return this.transitionToRoute('loading').then(() => {
        return this.validationCancel(changesets, postCancel);
      });
    },
  },
});
