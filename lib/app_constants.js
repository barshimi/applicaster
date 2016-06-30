'use strict';
/**
 * Environment variables and application configuration.
 */


/* Set environment for configuration */
var env = process.env.NODE_ENV;

var envConfig = {
  development: {
    app: {
      env: 'development',
      cacheTime: 7 * 24 * 60 * 60 * 1000, /* default caching time (7 days) for static files, calculated in milliseconds - optionally if not using nginx */
      port: process.env.PORT || 2500
    }
  },

  test: {
    app: {
      env: 'test',
      port: 2501
    }
  },

  production: {
    app: {
      env: 'production',
      port: process.env.PORT || 2500,
      cacheTime: 7 * 24 * 60 * 60 * 1000 /* default caching time (7 days) for static files, calculated in milliseconds - optionally if not using nginx */
    }
  }
}

// override the base configuration with the platform specific values
module.exports = envConfig[env] || envConfig['development'];

