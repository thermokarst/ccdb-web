import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';

export default {
  dateMeasured: validatePresence(true),
  timeMeasured: validatePresence(true),
  waterTempC:   validateNumber({ allowBlank: true, integer: false, positive: false }),
  airTempC:     validateNumber({ allowBlank: true, integer: false, positive: false }),
  collection:   validatePresence(true),
}
