import Ember from 'ember';
import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  payloadTypeFromModelName(modelName) {
    return modelName.split('-').map(key => Ember.String.capitalize(key)).join('');
  }
});
