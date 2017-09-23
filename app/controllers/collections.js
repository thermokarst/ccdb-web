import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  queryParams: ['page'],
  page: 1,

  actions: {
    changePage(page) {
      this.set('page', page);
    },
  },
});
