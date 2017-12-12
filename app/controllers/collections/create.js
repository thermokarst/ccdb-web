import Ember from 'ember';
import CollectionValidations from 'ccdb-web/validations/collection';
import CollectionSpeciesValidations from 'ccdb-web/validations/collection-species';
import DatasheetValidations from 'ccdb-web/validations/datasheet';
import ValidationMixin from 'ccdb-web/mixins/validation';

const { Controller, computed } = Ember;

export default Controller.extend(ValidationMixin, {
  CollectionValidations,
  CollectionSpeciesValidations,
  DatasheetValidations,

  hasMany: ['collectionSpecies', 'datasheets'],

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
