/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'last-strawberry',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },

      LOG_STACKTRACE_ON_DEPRECATION: false
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    googleApi: {
      accessToken: process.env.GOOGLE_API_KEY,
    },

    routificApi: {
      accessToken: process.env.ROUTIFIC_API_KEY,
    },

    browserify: {
       tests: true
     },
  };

  ENV.apiHost = ''

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-eval' http://laststrawberry.dev:* http://admin.dev:* https://cdn.mxpnl.com  *.googleapis.com *.cloudflare.com", // Allow scripts from https://cdn.mxpnl.com
    'font-src': "'self' *.gstatic.com *.googleapis.com", // Allow fonts to be loaded from http://fonts.gstatic.com
    'connect-src': "'self' ws://laststrawberry.dev:* ws://admin.dev:* http://localhost:3000 https://routific.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
    'img-src': "'self' data: *.basemaps.cartocdn.com",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com
    'media-src': "'self'"
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'login',
    routeAfterAuthentication: 'companies',
    routeIfAlreadyAuthenticated: 'companies'
  };

  if (environment === 'development') {
    ENV.apiHost = process.env.API_HOST;

    ENV['ember-cli-mirage'] = {
      enabled: false
    }
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.apiHost = process.env.API_HOST;
  }

  return ENV;
};
