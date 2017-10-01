import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model() {
    const store = this.get('store');
    return RSVP.hash({
      model: store.createRecord('collection'),
      projectOptions: store.findAll('project'),
      studyLocationOptions: store.findAll('study-location'),
      collectionTypeOptions: store.findAll('collection-type'),
      collectionMethodOptions: store.findAll('collection-method'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  },
});
