import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default Route.extend({
  model(params) {
    return RSVP.all([
      this.get('store').findRecord('collection', params.collection_id, {
        include: 'collection-species,datasheets,env-measurements',
      })
    ]);
  },
});
