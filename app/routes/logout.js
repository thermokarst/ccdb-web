import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  session: service('session'),

  beforeModel() {
    this.get('session').invalidate();
  }
});
