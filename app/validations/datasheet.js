import {
  validatePresence,
} from 'ember-changeset-validations/validators';

export default {
  datasheet:  validatePresence(true),
  collection: validatePresence(true),
}
