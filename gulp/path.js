(function() {
  'use strict';

  module.exports = {
    build: 'dist',
    startupFile: 'src/index.js',
    js: 'src/**/*.js',
    'unit_tests': 'src/**/*.spec.js',
    'smoke_tests': 'smoke/*_spec.js',
    coverage: 'coverage',
    port: 9000
  };
})();
