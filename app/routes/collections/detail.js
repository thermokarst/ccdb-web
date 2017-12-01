import Ember from 'ember';

const { Route, RSVP } = Ember;

export default Route.extend({
  model(params) {
    return RSVP.all([
      this.get('store').findRecord('collection', params.collection_id, {
        include: 'collection-species,datasheets',
      })
    ]);
  },
});
