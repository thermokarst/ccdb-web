import Ember from 'ember';

const { Controller, computed, get, set } = Ember;


export default Controller.extend({
  queryParams: ['page', 'project', 'region', 'site', 'study_location',
                'collection_method', 'number_of_traps', 'collection_start_date',
                'collection_end_date', 'adfg_permit', 'species'],
  page: 1,
  project: [],
  region: [],
  site: [],
  study_location: [],
  collection_method: [],
  adfg_permit: [],
  species: [],
  number_of_traps: '',
  collection_start_date: '',
  collection_end_date: '',

  options: computed('projectOptions', 'regionOptions', 'siteOptions',
                    'studyLocationOptions', 'collectionMethodOptions',
                    'adfgPermitOptions', 'speciesOptions', function() {
    return {
      projects: this.get('projectOptions'),
      regions: this.get('regionOptions'),
      sites: this.get('siteOptions'),
      studyLocations: this.get('studyLocationOptions'),
      collectionMethods: this.get('collectionMethodOptions'),
      adfgPermits: this.get('adfgPermitOptions'),
      species: this.get('speciesOptions'),
    };
  }),

  _coerceId(model) {
    return +get(model, 'id');
  },

  actions: {
    changePage(page) {
      this.set('page', page);
    },
    rowClick(row) {
      this.transitionToRoute('collections.detail', row.get('id'));
    },
    createCollection() {
      this.transitionToRoute('collections.create');
    },
    resetFilter() {
      set(this, 'page', 1);
      ['project', 'region', 'site', 'study_location', 'collection_method',
         'adfg_permit', 'species'].forEach((field) => {
        set(this, field, []);
      });
      ['number_of_traps', 'collection_start_date', 'collection_end_date'].forEach((field) => {
        set(this, field, '');
      });
    },
    changeFilter(filter) {
      // Need to reset the page so that things don't get weird
      set(this, 'page', 1);

      const filterModelFields = ['project', 'region', 'site', 'study_location',
                                 'collection_method', 'adfg_permit', 'species'];

      filterModelFields.forEach((field) => {
        let fields = get(filter, field);
        fields = fields.map(this._coerceId);
        set(this, field, fields);
      });

      set(this, 'number_of_traps', get(filter, 'number_of_traps'));

      ['collection_start_date', 'collection_end_date'].forEach((field) => {
        let value = get(filter, field);
        if (value) {
          value = value.toJSON().split('T')[0];
        } else {
          value = '';
        }
        set(this, field, value);
      });
    },
  },
});
