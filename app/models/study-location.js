import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name:               attr('string'),
  code:               attr('string'),
  studyLocationType:  attr('string'),
  treatmentType:      attr('string'),
  collectingLocation: attr('string'),
  description:        attr('string'),
  sortOrder:          attr('number'),

  site: belongsTo('site'),
});
