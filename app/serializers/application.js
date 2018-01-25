import { capitalize } from '@ember/string';
import DS from 'ember-data';

const { JSONAPISerializer } = DS;

export default JSONAPISerializer.extend({
  payloadTypeFromModelName(modelName) {
    return modelName.split('-').map(key => capitalize(key)).join('');
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedDocument = this._super(store, primaryModelClass, payload, id, requestType);
    normalizedDocument.meta.links = normalizedDocument.links;
    return normalizedDocument;
  },
});
