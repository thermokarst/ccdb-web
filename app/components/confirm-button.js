import Component from '@ember/component';

export default Component.extend({
  tagName: 'span',
  showConfirm: false,
  initialLabel: 'LABEL',
  confirmLabel: 'CONFIRM LABEL',
  cancelLabel: 'Cancel',

  actions: {
    initial() {
      this.set('showConfirm', true);
    },

    cancel() {
      this.set('showConfirm', false);
    },

    confirm() {
      this.get('onClick')();
    },
  },
});
