/* globals describe, before, after, afterEach, it */
'use strict';

var grunt = require('grunt');
var jsonlint = require('@prantlf/jsonlint');
var validator = require('@prantlf/jsonlint/lib/validator');
var sorter = require('@prantlf/jsonlint/lib/sorter');
var _ = require('lodash');

var expect = require('expect.js');
var sinon = require('sinon');
expect = require('sinon-expect').enhance(expect, sinon, 'was');

var taskFactory = require('../lib/grunt-jsonlint-task');

function createPassingJsonlintSpy() {
  return {
    parse: sinon.spy()
  };
}

function createFailingJsonlintSpy() {
  var x = {
    parse: function (/*data*/) {
      var error = new SyntaxError('Parse error on line 1, column 3:\n{ 3...\n--^\nExpected "}" and instead saw "3"');
      error.reason = 'Expected "}" and instead saw "3"';
      error.exzerpt = '{ 3...';
      error.pointer = '--^';
      error.location = {
        start: {
          line: 3,
          column: 8,
          offset: 11
        }
      };
      throw error;
    }
  };
  return x;
}

function createTaskContext(data) {
  var target = 'unit test';
  var normalizedFiles = grunt.task.normalizeMultiTaskFiles(data, target);

  var filesSrc = normalizedFiles.map(function (f) {
    return f.src;
  }).reduce(function (prev, curr) {
    return prev.concat(curr);
  }, []);

  var optionsFunc = (function optionsFunc(options) {
    return function(defaultOptions) {
      return _.extend(defaultOptions, options);
    };
  }(data.options));

  return {
    target: target,
    files: normalizedFiles,
    filesSrc: filesSrc,
    data: data,
    errorCount: 0,
    flags: {},
    nameArgs: '',
    args: [],
    name: 'jsonlint',
    options: optionsFunc
  };
}

function runWithFiles(grunt, jsonlint, files, options) {
  var gruntFiles = files.map(function (file) {
    return {
      src: file
    };
  });

  taskFactory(grunt, jsonlint, validator, sorter).bind(createTaskContext({
    files: gruntFiles,
    options: options
  }))();
}

function expectSuccess(gruntSpy) {
  expect(gruntSpy.fail.warn).was.notCalled();
  expect(gruntSpy.log.ok).was.calledOnce();
  expect(gruntSpy.log.ok).was.calledWith('1 file lint free.');
}

function expectFailure(grunt, atLine, atColumn) {
  expect(grunt.log.error).was.calledOnce();
  expect(grunt.log.error).was.calledWith(
    'File "test/invalid.json" failed JSON validation at line ' +
    atLine + ', column ' + atColumn + '.');
}

function testReformattingFile(indent) {
  var options = {
    format: true
  };

  if (indent !== undefined) {
    options.indent = indent;
  }

  var expectedIndent = '';
  if (indent === undefined) {
    expectedIndent = '  ';
  }
  else {
    for (var i = 0; i < indent; i++) {
      expectedIndent += ' ';
    }
  }

  // Build an unformatted file for testing.
  grunt.file.write(__dirname + '/reformat-this.json', '{"somethingsomething":"something","something":"dark side"}');

  runWithFiles(grunt, jsonlint, [ 'test/reformat-this.json' ], options);

  var formatted = grunt.file.read(__dirname + '/reformat-this.json');
  var lines = formatted.split(/\r?\n/);
  expect(lines).to.have.length(5);
  expect(lines[0]).to.be('{');
  expect(lines[1]).to.be(expectedIndent + '"somethingsomething": "something",');
  expect(lines[2]).to.be(expectedIndent + '"something": "dark side"');
  expect(lines[3]).to.be('}');
  expect(lines[4]).to.be.empty();

  grunt.file.delete(__dirname + '/reformat-this.json');
}

function testSortingObjectKeys() {
  var options = {
    format: true,
    sortKeys: true
  };

  // Build an unformatted file for testing.
  grunt.file.write(__dirname + '/reformat-this.json', '{"somethingsomething":"something","something":"dark side"}');

  runWithFiles(grunt, jsonlint, [ 'test/reformat-this.json' ], options);

  var formatted = grunt.file.read(__dirname + '/reformat-this.json');
  var lines = formatted.split(/\r?\n/);
  expect(lines).to.have.length(5);
  expect(lines[0]).to.be('{');
  expect(lines[1]).to.be('  "something": "dark side",');
  expect(lines[2]).to.be('  "somethingsomething": "something"');
  expect(lines[3]).to.be('}');
  expect(lines[4]).to.be.empty();

  grunt.file.delete(__dirname + '/reformat-this.json');
}

describe('grunt-jsonlint task', function () {
  before('stub out and spy on grunt logger', function () {
    sinon.stub(grunt.log, 'ok');
    sinon.stub(grunt.log, 'error');
    sinon.stub(grunt.log, 'writeln');
    sinon.stub(grunt.fail, 'warn');
  });

  after('restore grung logger methods', function () {
    grunt.log.ok.restore();
    grunt.log.error.restore();
    grunt.log.writeln.restore();
    grunt.fail.warn.restore();
  });

  afterEach('reset the spy counts', function () {
    grunt.log.ok.reset();
    grunt.log.error.reset();
    grunt.log.writeln.reset();
    grunt.fail.warn.reset();
  });

  // basic pass/fail behaviors

  it('passes a valid JSON file', function () {
    runWithFiles(grunt, jsonlint, [ 'test/valid.json' ]);
    expectSuccess(grunt);
  });

  it('fails an invalid JSON file', function () {
    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ]);
    expectFailure(grunt, 10, 9);
  });

  it('passes a valid CJSON file', function () {
    runWithFiles(grunt, jsonlint, [ 'test/cjson.json' ], { cjson: true });
    expectSuccess(grunt);
  });

  // reporting behaviors

  it('reports a failure for each files which failed to validate', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ]);
    expectFailure(grunt, 3, 8);
  });

  it('reports the file name and line number for each file that failed validation', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ]);
    expectFailure(grunt, 3, 8);
  });

  it('fails the build when a JSON file fails to validate', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ]);

    expect(grunt.fail.warn).was.calledOnce();
  });

  it('reports the number of files which validated successfully', function () {
    var jsonlint = createPassingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/valid.json' ]);

    expectSuccess(grunt);
  });

  it('reports the raw jsonlint exception message during failure', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ], {
      reporter: 'exception'
    });

    var message = grunt.log.writeln.args[0][0];
    expect(message).not.to.contain('Parse error');
    expect(message).to.contain('and instead saw');
  });

  it('includes jshint-style details of failure', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ], {
      reporter: 'jshint'
    });

    var message = grunt.log.writeln.args[0][0];

    expect(message).to.contain('"3"');
    expect(message).to.contain('3 | ');
    expect(message).to.contain(grunt.util.linefeed);
    expect(message).to.contain('^ Expected');
    expect(message).to.contain('and instead saw ');
  });

  it('formats validation errors for Visual Studio when the appropriate option is given', function () {
    var jsonlint = createFailingJsonlintSpy();

    runWithFiles(grunt, jsonlint, [ 'test/invalid.json' ], {
      formatter: 'msbuild'
    });
    expect(grunt.log.error).was.calledWith('test/invalid.json(3,8): error: failed JSON validation');
  });

  // formatting of the JSON files.

  it('reformats the input JSON file when configured to do so, using the default indentation level of 2', function () {
    testReformattingFile();
  });

  it('reformats the input JSON file using the specified indentation level', function () {
    testReformattingFile(1);
    testReformattingFile(2);
    testReformattingFile(3);
  });

  it('reformats the input JSON file with object keys sorted', function () {
    testSortingObjectKeys();
  });
});
