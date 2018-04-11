/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: (EmberApp.env() === 'test'),
    },
  });

  app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap-theme.min.css');

  app.import('node_modules/raven-js/dist/raven.js');
  app.import('node_modules/raven-js/dist/plugins/ember.js');

  return app.toTree();
};
