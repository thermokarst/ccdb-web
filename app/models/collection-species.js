import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  sex:            attr('string'),
  count:          attr('number'),
  countEstimated: attr('boolean', { defaultValue: false }),

  collection: belongsTo('collection'),
  species:    belongsTo('species'),
});