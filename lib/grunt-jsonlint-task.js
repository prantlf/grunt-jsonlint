'use strict';

/**
 * The meat of this Grunt plugin's task implementation is broken out into
 * a library file so that it can be called directly with dependencies injected.

 * This facilitates testing.
 */
exports = module.exports = function makeTask(grunt, jsonlint, validator, sorter) {
  var FORMATTERS = {
    prose: require('../lib/formatters/prose'),
    msbuild: require('../lib/formatters/visual-studio')
  };

  var REPORTERS = {
    exception: require('../lib/reporters/exception'),
    jshint: require('../lib/reporters/jshint-style')
  };

  return function () {
    var options = this.options({
      mode: 'json',
      ignoreComments: false,
      ignoreTrailingCommas: false,
      allowSingleQuotedStrings: false,
      allowDuplicateObjectKeys: true,
      schema: {},
      cjson: false,
      format: false,
      indent: 2,
      sortKeys: false,
      formatter: 'prose',
      reporter: 'exception'
    });
    var schema = options.schema;
    var parserOptions = {
      mode: options.mode,
      ignoreComments: options.ignoreComments || options.cjson ||
                      options.mode === 'cjson' || options.mode === 'json5',
      ignoreTrailingCommas: options.ignoreTrailingCommas || options.mode === 'json5',
      allowSingleQuotedStrings: options.allowSingleQuotedStrings || options.mode === 'json5',
      allowDuplicateObjectKeys: options.allowDuplicateObjectKeys,
      environment: schema.environment
    };

    var format = FORMATTERS[options.formatter];
    var report = REPORTERS[options.reporter];

    if (this.filesSrc) {
      var failed = 0;
      this.filesSrc.forEach(function (file) {
        grunt.log.debug('Validating "' + file + '"...');
        try {
          var data = grunt.file.read(file);
          var parsedData = jsonlint.parse(data, parserOptions);
          if (schema.src) {
            var parsedSchema = grunt.file.read(schema.src);
            var validate = validator.compile(parsedSchema, parserOptions);
            validate(parsedData);
          }
          grunt.verbose.ok('File "' + file + '" is valid JSON.');
          if ( options.format ) {
            if ( options.sortKeys ) {
              parsedData = sorter.sortObject(parsedData);
            }
            var formatted = JSON.stringify( parsedData, null, options.indent ) + '\n';
            grunt.file.write( file, formatted );
            grunt.verbose.ok( 'File "' + file + '" formatted.' );
          }
        }
        catch (error) {
          failed++;
          grunt.log.error(format(file, error));
          grunt.log.writeln(report(file, error, grunt));
        }
      });

      if (failed > 0) {
        grunt.fail.warn(failed + ' ' + grunt.util.pluralize(failed, 'file/files') + ' failed validation');
      }
      else {
        var successful = this.filesSrc.length - failed;
        grunt.log.ok(successful + ' file' + (successful === 1 ? '' : 's') + ' lint free.');
      }
    }
  };
};
