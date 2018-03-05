import { getProperties, set } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { debounce } from '@ember/runloop';
import RSVP from 'rsvp';
import Changeset from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import config from 'ccdb-web/config/environment';

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
    this.set('newStudyLocationAdmin', `${config.APP.API_HOST}/admin/locations/studylocation/add/`);
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

    // Gross, this side-effects by saving immediately. Someday I should clean
    // this up, but for now, you have been warned.
    addOption(relatedModelName, optionName, collectionAttrName, relatedAttrName, term) {
      const props = getProperties(this, 'store', 'options', 'changesets');
      const { store, options, changesets: { model } } = props;
      let payload = {};
      payload[relatedAttrName] = term;
      const record = store.createRecord(relatedModelName, payload)
      record.save().then((record) => {
        set(options, optionName, store.peekAll(relatedModelName));
        set(model, collectionAttrName, record);
      });
    },

    updateDatasheet(changeset, event) {
      changeset.set('datasheet', event.target.files[0]);
    },

    searchStudyLocation(term) {
      return new RSVP.Promise((resolve, reject) => {
        debounce(this, this._performSearch, 'study-location', { page_size: 500, code: term }, resolve, reject, 400);
      });
    },
  },

  _performSearch(model, payload, resolve, reject) {
    this.get('store').query(model, payload).then((results) => {
      resolve(results);
    }, reject);
  },
});
