import Ember from 'ember';
import DS from 'ember-data';

const { computed } = Ember;
const { Model, attr, belongsTo } = DS;

export const schema = {
  displayName:         attr('string'),
  numberOfTraps:       attr('number'),
  collectionStartDate: attr('string-null-to-empty'),
  collectionStartTime: attr('string-null-to-empty'),
  collectionEndDate:   attr('string-null-to-empty'),
  collectionEndTime:   attr('string-null-to-empty'),

  project:          belongsTo('project'),
  studyLocation:    belongsTo('study-location'),
  collectionMethod: belongsTo('collection-method'),
  collectionType:   belongsTo('collection-type'),
  adfgPermit:       belongsTo('adfg-permit'),
};

export default Model.extend(Object.assign({}, schema, {
  startDateTime: computed('collectionStartDate', 'collectionStartTime',
    function() { return this._mergeDateTime('Start'); }),

  endDateTime: computed('collectionEndDate', 'collectionEndTime',
    function() { return this._mergeDateTime('End'); }),

  _mergeDateTime(timepoint) {
    const date = this.get(`collection${timepoint}Date`);
    const time = this.get(`collection${timepoint}Time`);
    return `${date} ${time}`.trim();
  },
}));
