/*global global*/

'use strict';

const fs = require('fs');
const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

global.config = {
  env: 'prod',
  src: 'src',
  /* returns a [Promise] to simplify using with gulp */
  setEnv: function(env) {
    switch(env) {
      case 'test':
      case 'dev':
      case 'prod': {
        this.env = env;
        return Promise.resolve(null);
      }
      default: {
        throw new Exception(`[setEnv] given invalid env "${ env }"`);
      }
    }
  },
  get isDev() {
    return (this.env === 'dev');
  },
  get isProd() {
    return (this.env === 'prod');
  },
  get tmp() {
    return `.tmp-${ this.env }`;
  },
  get dist() {
    throw new Error('[global.config.dist] is not valid, try [global.config.dest]');
  },
  get dest() {
    switch(this.env) {
      case 'test': {
        return '.tmp-test-dest';
      }
      case 'dev':
      case 'development': {
        return '.tmp-serve';
      }
      case 'prod':
      case 'production': {
        return 'release';
      }
      default: {
        throw new Error('Invalid value for [global.config.env]')
      }
    }
  },
};

gulp.registry(HubRegistry([
  // Gulp 4 sucks, so we have to manually order the loading of tasks
  `tasks/typescript.js`,
  `tasks/default.js`,
]));
