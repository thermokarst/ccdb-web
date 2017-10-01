import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'a',
  classNames: ['btn'],
  classNameBindings: [
    'isDefault:btn-default',
    'isPrimary:btn-primary',
    'isSuccess:btn-success',
    'isInfo:btn-info',
    'isWarning:btn-warning',
    'isDanger:btn-danger',
    'isLink:btn-link',
  ],

  // ARGS
  isDefault: false,
  isPrimary: false,
  isSuccess: false,
  isInfo: false,
  isWarning: false,
  isDanger: false,
  isLink: false,

  label: 'LABEL',

  click() {
    this.get('onClick')();
  }
});
