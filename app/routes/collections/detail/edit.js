import Ember from 'ember';
import CleanupFormMixin from 'ccdb-web/mixins/cleanup-form';

const { Route, RSVP } = Ember;

export default Route.extend(CleanupFormMixin, {
  model() {
    const store = this.get('store');
    const model = this.modelFor('collections.detail');
    return RSVP.hash({
      model: model,
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
    // Unwrap the parent route's listified model
    models.model = models.model[0];
    controller.setProperties(models);
  },
});
