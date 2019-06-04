'use strict';

module.exports = function (grunt) {
  var jsonlint = require('@prantlf/jsonlint');
  var validator = require('@prantlf/jsonlint/lib/validator');
  var sorter = require('@prantlf/jsonlint/lib/sorter');
  var gruntJsonLintTask = require('../lib/grunt-jsonlint-task');

  grunt.registerMultiTask('jsonlint', 'Validate JSON files.',
    gruntJsonLintTask(grunt, jsonlint, validator, sorter));
};


