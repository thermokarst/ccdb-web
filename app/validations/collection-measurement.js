import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';

export default {
  dateMeasured: validatePresence(true),
  timeMeasured: validatePresence(true),
  waterTemp:    validateNumber({ allowBlank: true, integer: false, positive: false }),
  airTemp:      validateNumber({ allowBlank: true, integer: false, positive: false }),
  collection:   validatePresence(true),
}
