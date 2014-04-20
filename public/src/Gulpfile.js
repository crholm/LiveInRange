'use strict';

// plugins
var gulp  = require('gulp'),
    concat = require('gulp-concat'),
    htmlbuild = require('gulp-htmlbuild'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    ngmin = require('gulp-ngmin'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    html2js = require('gulp-html2js'),
    es = require('event-stream');

// other vars
var buildPath = '../dist',
    jsOutFilename = 'script.js';

// pipe a glob stream into this and receive a gulp file stream
var gulpSrc = function (opts) {
  var paths = es.through();
  var files = es.through();
  
  paths.pipe(es.writeArray(function (err, srcs) {

    // make paths relative to this gulpfile...
    srcs = srcs.map(function(src) {
      return src.replace('src/', '');
    })

    gulp.src(srcs, opts).pipe(files);
  }));
  
  return es.duplex(paths, files);
};

gulp.task('less', function() {
  gulp.src('less/style.less')
    .pipe(less())
    .pipe(gulp.dest('../'));
})

gulp.task('js', function() {
  // concat all js include tags to a single one in index.html
  gulp.src(['../index.html'])
    .pipe(htmlbuild({
      js: htmlbuild.preprocess.js(function (block) {

        // concat js files and write to all.js
        block.pipe(gulpSrc())
          .pipe(concat(jsOutFilename))
          // .pipe(ngmin())
          // .pipe(uglify())
          .pipe(gulp.dest(buildPath));

        // write js include tag all.js to index.html
        block.end(jsOutFilename);
      })
    }))
    .pipe(gulp.dest(buildPath));
})

gulp.task('ngt', function() {
  gulp.src('app/views/**/*.ngt')
    .pipe(html2js())
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('app'));
})

gulp.task('build', ['less', 'ngt', 'js'], function() {
  // move stuff to dist/
  gulp.src('../style.css')
    .pipe(gulp.dest(buildPath));
  gulp.src('../img')
    .pipe(gulp.dest(buildPath));
});

gulp.task('default', function () {
  gulp.watch('less/**/*.less', ['less']);
  gulp.watch('app/views/**/*.ngt', ['ngt']);
});