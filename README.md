# @prantlf/grunt-jsonlint
[![NPM version](https://badge.fury.io/js/%40prantlf%2Fgrunt-jsonlint.svg)](https://badge.fury.io/js/%40prantlf%2Fgrunt-jsonlint)
[![Build Status](https://travis-ci.com/prantlf/grunt-jsonlint.svg?branch=master)](https://travis-ci.com/prantlf/grunt-jsonlint)
[![Coverage Status](https://coveralls.io/repos/github/prantlf/grunt-jsonlint/badge.svg?branch=master)](https://coveralls.io/github/prantlf/grunt-jsonlint?branch=master)
[![Dependency Status](https://david-dm.org/prantlf/grunt-jsonlint.svg)](https://david-dm.org/prantlf/grunt-jsonlint)
[![devDependency Status](https://david-dm.org/prantlf/grunt-jsonlint/dev-status.svg)](https://david-dm.org/prantlf/grunt-jsonlint#info=devDependencies)

Validates [JSON]/[JSON5] files from [`grunt`] using [`jsonlint`].

This is a fork of the original package with the following enhancements:

* Supports [JSON Schema] drafts 04, 06 and 07.
* Optionally recognizes JavaScript-style comments and single quoted strings.
* Optionally ignores trailing commas and reports duplicate object keys as an error.
* Can sort object keys alphabetically.
* Prefers using the 8x faster native JSON parser, if possible.
* Formats column number of error occurrences too, does not report error location twice.
* Depends on up-to-date npm modules with no installation warnings.

Requires grunt 1.0+ and node 4.0+.

## Installation

    npm i @prantlf/grunt-jsonlint -D

## Configuration

Add the following (multi-)task to your Gruntfile:

    jsonlint: {
      sample: {
        src: [ 'some/valid.json' ],
        options: {
          formatter: 'prose'
        }
      }
    }

Add the following to load the task into your Gruntfile:

    grunt.loadNpmTasks('@prantlf/grunt-jsonlint');

An error will be thrown if the JSON file contains syntax errors.  To prefer an error format compatible with Visual Studio, change the formatter to 'msbuild'.

## Customizing

There is a couple of options, which can support non-standard JSON syntax, usually used in configuration files for convenience:

    jsonlint: {
      all: {
        src: [ 'some/settings.json' ],
        options: {
          mode: 'json',
          ignoreComments: false,
          ignoreTrailingCommas: false,
          allowSingleQuotedStrings: false,
          allowDuplicateObjectKeys: true,
        }
      }
    }

* `mode`, when set to "cjson" or "json5", enables some other flags automatically
* `ignoreComments`, when `true` JavaScript-style single-line and multiple-line comments will be recognised and ignored
* `ignoreTrailingCommas`, when `true` trailing commas in objects and arrays will be ignored
* `allowSingleQuotedStrings`, when `true` single quotes will be accepted as alternative delimiters for strings
* `allowDuplicateObjectKeys`, when `false` duplicate keys in objects will be reported as an error

## Formatting

Add the following (multi-)task to your Gruntfile:

    jsonlint: {
      all: {
        src: [ 'some/valid.json' ],
        options: {
          format: true,
          indent: 2,
          sortKeys: false
        }
      }
    }

* `format`, when `true` `JSON.stringify` will be used to format the JavaScript (if it is valid)
* `indent`, the value passed to `JSON.stringify`, it can be the number of spaces, or string like "\t"
* `sortKeys`, when `true` keys of objects in the output JSON will be sorted alphabetically (`format` has to be set to `true` too)

## Schema Validation

You can validate JSON files using JSON Schema drafts 04, 06 or 07:

    jsonlint: {
      all: {
        src: [ 'some/manifest.json' ],
        options: {
          schema: {
            src: 'some/manifest-schema.json',
            environment: 'json-schema-draft-04'
          }
        }
      }
    }

* `schema`, when set the source file will be validated using ae JSON Schema in addition to the syntax checks
* `src`, when filled with a file path, the file will be used as a source of the JSON Schema
* `environment`, can specify the version of the JSON Schema draft to use for validation: "json-schema-draft-04", "json-schema-draft-06" or "json-schema-draft-07" (if not set, the schema draft version will be inferred automatically)

## Reporting

There are a few options available for reporting errors:

### Error Message Format

The standard error message format (`prose`) is optimized for human reading and looks like:

    >> File "test/invalid.json" failed JSON validation at line 9.

This is customizable to conform to the Visual Studio style by specifying the `formatter` option as `msbuild`, like:

    jsonlint: {

      visualStudioExample: {
        src: [ 'test/invalid.json' ],
        options: {
          formatter: 'msbuild'
        }
      }

    }

The output will look like:

    >> test/invalid.json(9): error: failed JSON validation

### Error Reporting

By default, the raw error from the underlying `jsonlint` library comes through to the grunt output.  It looks like:

    Error: Parse error on line 9:
    ...        "2"        "3",      ],      
    ----------------------^
    Expecting 'EOF', '}', ':', ',', ']', got 'STRING'

To customize this, change the `reporter` option to `jshint` (the format is inspired by how `jshint` formats their output, hence the name):

    jsonlint: {

      jshintStyle: {
        src: [ 'test/invalid.json' ],
        options: {
          reporter: 'jshint'
        }
      }

    }

The output will look like:

     9 |  "3"
          ^ Expected 'EOF', '}', ':', ',', ']' and instead saw '3'

The default reporter is called `exception` since it simply relays the raw exception.

## Running Tests

Unit tests are provided for automated regression testing. The easiest way
to run them is with:

    npm test

Alternatively, if you have `grunt-cli` installed, you could use grunt directly:

    grunt test

Which does the same thing.

## Release History

* 2013-02-20   v1.0.0	First official release
* 2015-10-29   v1.0.6	CJSON support thanks to @fredghosn, unit tests
* 2016-05-27   v1.0.8	Option to format JSON file thanks to @robblue2x
* 2016-06-11   v1.1.0	Enhanced error reporting for better human reading and Visual Studio integration.
* 2019-05-27   v1.2.0	Support comments, single-quoted strings and JSON Schema validation
* 2019-05-30   v1.3.0	Support object keys sorting in the formatted output
* 2019-05-30   v1.3.1	Prefer faster native JSON parser, fix error reporting
* 2019-06-02   v2.0.0	Upgrade to @prantlf/jsonlint using a hand-built parser instead of the Jison-generated one with additional options

## License

Copyright (C) 2013-2019 Brandon Ramirez, Ferdinand Prantl

Licensed under the MIT license.

[`grunt`]: https://gruntjs.com/
[`jsonlint`]: https://prantlf.github.io/jsonlint/
[JSON]: https://tools.ietf.org/html/rfc8259
[JSON5]: https://spec.json5.org
[JSON Schema]: https://json-schema.org
