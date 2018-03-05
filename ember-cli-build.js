/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: (EmberApp.env() === 'test'),
    },
    'ember-bootstrap-datetimepicker': {
      'importBootstrapCSS': true,
      'importBootstrapJS': true,
      'importBootstrapTheme': true
    },
  });

  return app.toTree();
};
