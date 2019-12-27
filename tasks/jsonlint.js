const jsonlint = require('@prantlf/jsonlint');
const validator = require('@prantlf/jsonlint/lib/validator');
const sorter = require('@prantlf/jsonlint/lib/sorter');
const printer = require('@prantlf/jsonlint/lib/printer');
const gruntJsonLintTask = require('../lib/grunt-jsonlint-task');

module.exports = (grunt) => {
  grunt.registerMultiTask('jsonlint', 'Validate JSON files.',
    gruntJsonLintTask(grunt, jsonlint, validator, sorter, printer));
};
