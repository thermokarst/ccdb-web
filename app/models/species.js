import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  commonName: attr('string'),
  genus:      attr('string'),
  species:    attr('string'),
  parasite:   attr('boolean'),
  sortOrder:  attr('number'),
});
