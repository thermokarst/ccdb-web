import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'a',
  classNames: ['btn'],
  classNameBindings: [
    // Styles
    'isDefault:btn-default',
    'isPrimary:btn-primary',
    'isSuccess:btn-success',
    'isInfo:btn-info',
    'isWarning:btn-warning',
    'isDanger:btn-danger',
    'isLink:btn-link',
    // Sizes
    'isLarge:btn-lg',
    'isSmall:btn-sm',
    'isXSmall:btn-xs',
  ],

  // ARGS
  // Styles
  isDefault: false,
  isPrimary: false,
  isSuccess: false,
  isInfo: false,
  isWarning: false,
  isDanger: false,
  isLink: false,
  // Sizes
  isLarge: false,
  isSmall: false,
  isXSmall: false,

  label: 'LABEL',

  click() {
    this.get('onClick')();
  }
});
