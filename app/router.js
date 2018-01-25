import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('collections', function() {
    this.route('create');
    this.route('detail', { path: '/:collection_id' }, function() {
      this.route('edit');
    });
  });
});

export default Router;
