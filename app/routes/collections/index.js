import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.get('store').findAll('collection', {
      include: 'project,study-location,collection-method,collection-type'
    });
  }
});
