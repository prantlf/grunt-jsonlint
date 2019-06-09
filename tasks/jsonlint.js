/*
 * grunt-jsonlint
 * https://github.com/brandonsramirez/grunt-jsonlint
 *
 * Copyright (c) 2013 Brandon Ramirez
 * Licensed under the MIT license.
 */

const jsonlint = require('@prantlf/jsonlint');
const sorter = require('@prantlf/jsonlint/lib/sorter');
const validator = require('@prantlf/jsonlint/lib/validator');
const gruntJsonLintTask = require('../lib/grunt-jsonlint-task');

module.exports = (grunt) => {
  grunt.registerMultiTask('jsonlint', 'Validate JSON files.', gruntJsonLintTask(grunt, jsonlint, sorter, validator));
};
