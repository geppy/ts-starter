/*global global*/

'use strict';

const gulp = require('gulp');
const gulpTypeScript = require('gulp-typescript');

const project = gulpTypeScript.createProject(`tsconfig.json`, {
  noExternalResolve: true,
  typescript: require(`typescript`),
});

gulp.task(`clean:typescript`, () => {
  const del = require(`del`);
  
  return del([
    `${ global.config.tmp}/**/*.js`,
    `${ global.config.dest}/**/*.js`,
  ]);
});

gulp.task(`typescript:compile`, () => {
  return gulp.src([
    `${ global.config.src }/**/*.ts`,
  ])
    .pipe(gulpTypeScript(project))
    .js.pipe(gulp.dest(global.config.dest));
});

gulp.task(`typescript`,
  gulp.series(
    `clean:typescript`,
    `typescript:compile`
  )
);
