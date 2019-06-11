var oldNode = process.version.startsWith('v4.');

module.exports = function(grunt) {
  // Project configuration.
  var config = {
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      gruntfile: {
        src: [ 'Gruntfile.js' ]
      },
      packageJson: {
        src: [ 'package.json' ]
      },
      tasks: {
        src: [ 'tasks/*.js', 'lib/*.js' ],
        options: {
          eqnull: true,
          curly: true,
          newcap: true,
          unused: true,
          indent: 2,
          noempty: true,

          node: true
        }
      },
      tests: {
        src: [ 'test/*.js' ],
        options: {
          eqnull: true,
          indent: 2,
          node: true
        }
      }
    },

    jsonlint: {
      sample: {
        src: [ 'test/valid.json' ],
        options: {
          formatter: 'msbuild',
          reporter: 'jshint'
        }
      },
      packageJson: {
        src: [ 'package.json' ]
      },
      comments: {
        src: [ 'test/cjson.json' ],
        options: {
          ignoreComments: true
        }
      },
      singleQuotes: {
        src: [ 'test/single-quotes.json' ],
        options: {
          allowSingleQuotedStrings: true
        }
      },
      json5: {
        src: [ 'test/json5.json' ],
        options: {
          mode: 'json5'
        }
      },
      schema: {
        src: [ 'test/3.json' ],
        options: {
          schema: {
            src: 'test/3.schema.json'
          }
        }
      },
      overflowTest: {
        src: [ 'test/issue13/**/*.json' ]
      },
      invalid: {
        src: [ 'test/invalid.json' ]
      },
      invalidVisualStudio: {
        src: [ 'test/invalid.json' ],
        options: {
          formatter: 'msbuild'
        }
      },
      invalidJshintStyle: {
        src: [ 'test/invalid.json' ],
        options: {
          reporter: 'jshint'
        }
      }
    }
  };

  if (!oldNode) {
    config.mochaTest = {
      options: {
        reporter: 'spec'
      },
      unitTests: {
        src: [ 'test/unit-tests.js' ]
      },
      issue13Tests: {
        src: [ 'test/issue13-tests.js' ]
      }
    };
  }

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  if (!oldNode) {
    grunt.loadNpmTasks('grunt-mocha-test');
  }

  require('./tasks/jsonlint')(grunt);

  var tests = [
    'jshint', 'jsonlint:sample', 'jsonlint:packageJson', 'jsonlint:comments',
    'jsonlint:singleQuotes', 'jsonlint:json5'
  ];
  if (!oldNode) {
    tests.push('mochaTest');
  }
  grunt.registerTask('test', tests);

  // Default task(s).
  grunt.registerTask('default', [ 'test' ]);
};
