import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';

export default {
  sex:            validatePresence(true),
  count:          validateNumber({ allowBlank: true, integer: true, positive: true }),
  countEstimated: validatePresence(true),
  species:        validatePresence(true),
  collection:     validatePresence(true),
}
