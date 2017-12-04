import Ember from 'ember';
import CleanupFormMixin from 'ccdb-web/mixins/cleanup-form';

const { Route, RSVP } = Ember;

export default Route.extend(CleanupFormMixin, {
  model() {
    const store = this.get('store');
    return RSVP.hash({
      model: store.createRecord('collection'),
      projectOptions: store.findAll('project'),
      studyLocationOptions: store.findAll('study-location'),
      collectionTypeOptions: store.findAll('collection-type'),
      collectionMethodOptions: store.findAll('collection-method'),
      speciesOptions: store.findAll('species'),
      adfgPermitOptions: store.findAll('adfg-permit'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  },
});
