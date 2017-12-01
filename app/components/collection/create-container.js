import Ember from 'ember';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),

  init() {
    this._super(...arguments);
    const model = this.get('model');
    const validations = this.get('validations');

    let changesets = {};
    changesets['new'] = [];
    changesets['delete'] = [];
    changesets['hasMany'] = [];
    changesets['model'] = new Changeset(model,
                                        lookupValidator(validations['collection']),
                                        validations['collection']);

    let collectionSpeciesChangesets = [];
    const collectionSpecies = model.get('collectionSpecies');
    collectionSpecies.forEach((cs) => {
      const changeset = new Changeset(cs,
                                      lookupValidator(validations['collectionSpecies']),
                                      validations['collectionSpecies']);
      collectionSpeciesChangesets.push({ model: cs, changeset: changeset });
    });
    changesets['hasMany']['collectionSpecies'] = collectionSpeciesChangesets;

    let datasheetsChangesets = [];
    const datasheets = model.get('datasheets');
    datasheets.forEach((d) => {
      const changeset = new Changeset(d,
                                      lookupValidator(validations['datasheet']),
                                      validations['datasheet']);
      datasheetsChangesets.push({ model: d, changeset: changeset });
    });
    changesets['hasMany']['datasheets'] = datasheetsChangesets;

    this.set('changesets', changesets);
  },

  actions: {
    addCollectionSpecies() {
      const store = this.get('store');
      let changesets = this.get('changesets');
      const validations = this.get('validations');
      const collection = this.get('model');
      const cs = store.createRecord('collection-species', { collection: collection });
      collection.get('collectionSpecies').pushObject(cs);
      changesets['new'].pushObject(cs);
      const changeset = new Changeset(cs,
                                      lookupValidator(validations['collectionSpecies']),
                                      validations['collectionSpecies']);
      changesets['hasMany']['collectionSpecies'].pushObject({ model: cs, changeset: changeset });
    },

    deleteCollectionSpecies(changesetRecord) {
      let changesets = this.get('changesets');
      changesets['delete'].pushObject(changesetRecord.model);
      changesets['hasMany']['collectionSpecies'].removeObject(changesetRecord);
    },

    updateDatasheet(changeset, event) {
      changeset.set('datasheet', event.target.files[0]);
    },

    addDatasheet() {
      const store = this.get('store');
      let changesets = this.get('changesets');
      const validations = this.get('validations');
      const collection = this.get('model');
      const d = store.createRecord('datasheet-attachment', { collection: collection });
      collection.get('datasheets').pushObject(d);
      changesets['new'].pushObject(d);
      const changeset = new Changeset(d,
                                      lookupValidator(validations['datasheets']),
                                      validations['datasheets']);
      changesets['hasMany']['datasheets'].pushObject({ model: d, changeset: changeset });
    },

    deleteDatasheet(changesetRecord) {
      let changesets = this.get('changesets');
      changesets['delete'].pushObject(changesetRecord.model);
      changesets['hasMany']['datasheets'].removeObject(changesetRecord);
    },
  },
});
