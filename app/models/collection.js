import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr, belongsTo, hasMany } = DS;

export default Model.extend({
  displayName:         attr('string'),
  numberOfTraps:       attr('number'),
  collectionStartDate: attr('string-null-to-empty'),
  collectionStartTime: attr('string-null-to-empty'),
  collectionEndDate:   attr('string-null-to-empty'),
  collectionEndTime:   attr('string-null-to-empty'),
  notes:               attr('string'),

  project:           belongsTo('project'),
  studyLocation:     belongsTo('study-location'),
  collectionMethod:  belongsTo('collection-method'),
  collectionType:    belongsTo('collection-type'),
  adfgPermit:        belongsTo('adfg-permit'),

  collectionSpecies: hasMany('collection-species'),
  datasheets:        hasMany('datasheet-attachment'),

  // computed
  species: computed.mapBy('collectionSpecies', 'species'),

  speciesNames: computed.mapBy('species', 'commonName'),

  counts: computed.mapBy('collectionSpecies', 'count'),

  speciesAndCounts: computed('speciesNames', 'counts', function() {
    const speciesNames = this.get('speciesNames');
    let counts = this.get('counts');
    counts = counts.map(c => c !== null ? c : 'No Count');
    return speciesNames.map((n, i) => `${n} (${counts[i]})`).join(', ');
  }),

  startDateTime: computed('collectionStartDate', 'collectionStartTime',
    function() { return this._mergeDateTime('Start'); }),

  endDateTime: computed('collectionEndDate', 'collectionEndTime',
    function() { return this._mergeDateTime('End'); }),

  _mergeDateTime(timepoint) {
    const date = this.get(`collection${timepoint}Date`);
    const time = this.get(`collection${timepoint}Time`);
    return `${date} ${time}`.trim();
  },
});
