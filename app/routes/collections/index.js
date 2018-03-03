import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  queryParams: {
    // qps are snake_case for the django api
    page: { refreshModel: true },
    project: { refreshModel: true },
    region: { refreshModel: true },
    site: { refreshModel: true },
    study_location: { refreshModel: true },
    collection_method: { refreshModel: true },
    number_of_traps: { refreshModel: true },
    collection_start_date: { refreshModel: true },
    collection_end_date: { refreshModel: true },
    adfg_permit: { refreshModel: true },
    species: { refreshModel: true },
  },

  model(params) {
    const store = this.get('store');
    const includes = ['project', 'study-location', 'study-location.site', 'site',
      'collection-method', 'adfg-permit', 'collection-species', 'collection-species.species'];
    const opts = {
      include: includes.join(','),
    };

    return RSVP.hash({
      projectOptions: store.findAll('project'),
      regionOptions: store.findAll('region'),
      siteOptions: store.findAll('site'),
      studyLocationOptions: store.findAll('study-location'),
      collectionMethodOptions: store.findAll('collection-method'),
      adfgPermitOptions: store.findAll('adfg-permit'),
      speciesOptions: store.query('species', { page_size: 500 }),
      model: store.query('collection', Object.assign(params, opts)),
    });
  },

  setupController(controller, models) {
    this._super(...arguments);
    controller.setProperties(models);

    const store = this.get('store');

    let project = controller.get('project');
    project = project.map(id => store.peekRecord('project', id));

    let region = controller.get('region');
    region = region.map(id => store.peekRecord('region', id));

    let site = controller.get('site');
    site = site.map(id => store.peekRecord('site', id));

    let studyLocation = controller.get('study_location');
    studyLocation = studyLocation.map(id => store.peekRecord('study-location', id));

    let collectionMethod = controller.get('collection_method');
    collectionMethod = collectionMethod.map(id => store.peekRecord('collection-method', id));

    let adfgPermit = controller.get('adfg_permit');
    adfgPermit = adfgPermit.map(id => store.peekRecord('adfg-permit', id));

    let species = controller.get('species');
    species = species.map(id => store.peekRecord('species', id));

    const numberOfTraps = controller.get('number_of_traps');
    const collectionStartDate = controller.get('collection_start_date');
    const collectionEndDate = controller.get('collection_end_date');

    let filter = {
      project,
      region,
      site,
      study_location: studyLocation,
      collection_method: collectionMethod,
      number_of_traps: numberOfTraps,
      collection_start_date: collectionStartDate,
      collection_end_date: collectionEndDate,
      adfg_permit: adfgPermit,
      species,
    }
    controller.set('filters', filter);
  },
});
