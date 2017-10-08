import {
  validatePresence,
  validateNumber,
} from 'ember-changeset-validations/validators';

export default {
  project:             validatePresence(true),
  studyLocation:       validatePresence(true),
  collectionMethod:    validatePresence(true),
  collectionType:      validatePresence(true),
  numberOfTraps:       validateNumber({ allowBlank: true, integer: true, positive: true }),

  collectionStartDate: validatePresence(true),
  collectionEndDate:   validatePresence(true),
  // TODO: Fix time formats
}
