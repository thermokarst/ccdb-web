import DS from 'ember-data';

const { Model, attr, hasMany, belongsTo } = DS;

export default Model.extend({
  name:        attr('string'),
  code:        attr('string'),
  description: attr('string'),
  sortOrder:   attr('number'),

  region:        belongsTo('region'),
  studyLocation: hasMany('study-location'),
});
