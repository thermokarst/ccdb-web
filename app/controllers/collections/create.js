import Controller from '@ember/controller';
import { computed } from '@ember/object';
import CollectionValidations from 'ccdb-web/validations/collection';
import CollectionSpeciesValidations from 'ccdb-web/validations/collection-species';
import CollectionMeasurementValidations from 'ccdb-web/validations/collection-measurement';
import DatasheetValidations from 'ccdb-web/validations/datasheet';
import ValidationMixin from 'ccdb-web/mixins/validation';

export default Controller.extend(ValidationMixin, {
  CollectionValidations,
  CollectionSpeciesValidations,
  DatasheetValidations,
  CollectionMeasurementValidations,

  hasMany: ['collectionSpecies', 'datasheets', 'envMeasurements'],

  options: computed('projectOptions', 'studyLocationOptions',
                    'collectionTypeOptions', 'collectionMethodOptions',
                    'speciesOptions', 'adfgPermitOptions', 'sexOptions',
                    function() {
    return {
      projects: this.get('projectOptions'),
      studyLocations: this.get('studyLocationOptions'),
      collectionTypes: this.get('collectionTypeOptions'),
      collectionMethods: this.get('collectionMethodOptions'),
      species: this.get('speciesOptions'),
      adfgPermits: this.get('adfgPermitOptions'),
      sexes: this.get('sexOptions'),
    };
  }),

  actions: {
    onSave(changeset) {
      const postSave = () => { this.transitionToRoute('collections.index'); };
      return this.transitionToRoute('loading').then(() => {
        return this.validationSave(changeset, postSave);
      });
    },
    onCancel(changeset) {
      const postCancel = () => { this.transitionToRoute('collections.index'); };
      return this.transitionToRoute('loading').then(() => {
        return this.validationCancel(changeset, postCancel);
      });
    },
  },
});
