/* eslint-env node */
'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'ccdb-web',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        'ds-payload-type-hooks': true,
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    sentry: {
      dsn: 'https://fd3c695fa9394de48a7c69b7a322960b@sentry.io/1186914',
      globalErrorCatching: false,
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval'",
      'img-src': 'data: app.getsentry.com',
    }
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = 'http://localhost:8000';
    ENV.APP.API_NAMESPACE = 'api/v1';
    ENV.sentry.development = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.API_HOST = 'https://ccdb-api.thermokar.st';
    ENV.APP.API_NAMESPACE = 'api/v1';
  }

  return ENV;
};
