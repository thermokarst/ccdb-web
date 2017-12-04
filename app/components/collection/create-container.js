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
    const hasMany = this.get('hasMany');

    let changesets = {};
    changesets['new'] = [];
    changesets['delete'] = [];
    changesets['hasMany'] = [];
    changesets['model'] = new Changeset(model,
                                        lookupValidator(validations['collection']),
                                        validations['collection']);

    hasMany.forEach((hasMany) => {
      let relatedChangesets = [];
      let validation = validations[hasMany];
      const related = model.get(hasMany);
      related.forEach((r) => {
        const changeset = new Changeset(r, lookupValidator(validation),
                                        validation);
        relatedChangesets.push({ model: r, changeset: changeset });
      });
      changesets['hasMany'][hasMany] = relatedChangesets;
    });

    this.set('changesets', changesets);
  },

  actions: {
    addHasMany(modelName, relatedName) {
      const store = this.get('store');
      let changesets = this.get('changesets');
      const validations = this.get('validations');
      const validation = validations[relatedName];
      const model = this.get('model');
      const related = store.createRecord(modelName, { collection: model });
      model.get(relatedName).pushObject(related);
      changesets['new'].pushObject(related);
      const changeset = new Changeset(related, lookupValidator(validation), validation);
      changesets['hasMany'][relatedName].pushObject({ model: related, changeset: changeset });
    },

    deleteHasMany(changesetRecord, relatedName) {
      let changesets = this.get('changesets');
      changesets['delete'].pushObject(changesetRecord.model);
      changesets['hasMany'][relatedName].removeObject(changesetRecord);
    },

    updateDatasheet(changeset, event) {
      changeset.set('datasheet', event.target.files[0]);
    },
  },
});
