import Ember from 'ember';

const { Component, computed, get, isEmpty } = Ember;

export default Component.extend({
  classNames: ['form-group'],
  classNameBindings: ['isValid::has-error'],

  isValid: computed('changeset.error', 'property', function() {
    const changeset = this.get('changeset');
    const property = this.get('property');
    return isEmpty(get(changeset, `error.${property}`));
  }),

  hasLabel: computed('label', function() {
    return !isEmpty(get(this, 'label'));
  }),
});
