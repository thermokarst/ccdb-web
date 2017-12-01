import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  datasheet: attr('file'),

  collection: belongsTo('collection'),
});
