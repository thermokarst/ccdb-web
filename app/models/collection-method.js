import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  name:                  attr('string'),
  code:                  attr('string'),
  collectionMethodClass: attr('string'),
  sortOrder:             attr('number'),
});
