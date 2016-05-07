/*global global*/

'use strict';

const gulp = require('gulp');

// Build Production Files, the Default Task
gulp.task('default',
  gulp.series(
    'typescript:compile'
  )
);
