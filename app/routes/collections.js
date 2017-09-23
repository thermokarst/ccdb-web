import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  queryParams: {
    page: { refreshModel: true },
  },

  model(params) {
    const include = {include: 'project,study-location,collection-method,collection-type'};
    return this.get('store').query('collection', Object.assign(params, include));
  },
});
