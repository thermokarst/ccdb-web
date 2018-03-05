import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const store = this.get('store');
    const model = this.modelFor('collections.detail');
    return RSVP.hash({
      model: model,
      projectOptions: store.findAll('project'),
      studyLocationOptions: store.query('study-location', { page_size: 500 }),
      collectionTypeOptions: store.findAll('collection-type'),
      collectionMethodOptions: store.findAll('collection-method'),
      speciesOptions: store.query('species', { page_size: 500 }),
      adfgPermitOptions: store.findAll('adfg-permit'),
      sexOptions: store.findAll('sex'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    // Unwrap the parent route's listified model
    models.model = models.model[0];
    controller.setProperties(models);
  },
});
