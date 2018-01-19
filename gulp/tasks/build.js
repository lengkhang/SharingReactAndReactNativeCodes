(function() {
  'use strict';

  let gulp = require('gulp'),
    babel = require('gulp-babel'),
    paths = require('../paths'),
    webpack = require('webpack'),
    webpackConfig = require('../../src/webpack.config.js'),
    path = require('path');

  gulp.task('build:js', [], function(done) {
    return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest(paths.build), done);
  });

  gulp.task('copy:scss', [], function(done) {
    return gulp.src('src/**/*.scss')
      .pipe(gulp.dest(paths.build), done);
  });

  gulp.task('build:webpack', [], function(done) {
    const config = webpackConfig({dev: false, outputPath: path.join(__dirname, '../../dist/static')});

    webpack(config, done);
  });

  gulp.task('build:static', [], function(done) {
    return gulp.src('src/static/**/*.*')
      .pipe(gulp.dest(path.join(paths.build, 'static')), done);
  });

  gulp.task('build', ['build:js', 'copy:scss', 'build:webpack', 'build:static'], function(done) {
    done();
  });

})();
