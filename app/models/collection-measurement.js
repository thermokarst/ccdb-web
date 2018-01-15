import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  dateMeasured: attr('string'),
  timeMeasured: attr('string'),
  waterTempC:   attr('number'),
  airTempC:     attr('number'),

  collection: belongsTo('collection'),
});
