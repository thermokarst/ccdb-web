import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model() {
    const store = this.get('store');
    return RSVP.hash({
      model: store.createRecord('collection'),
      projectOptions: store.findAll('project'),
      studyLocationOptions: store.findAll('study-location'),
      collectionTypeOptions: store.findAll('collection-type'),
      collectionMethodOptions: store.findAll('collection-method'),
      speciesOptions: store.query('species', { page_size: 500 }),
      adfgPermitOptions: store.findAll('adfg-permit'),
      sexOptions: store.findAll('sex'),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);
  },
});
