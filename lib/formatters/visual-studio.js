'use strict';

module.exports = function formatForVisualStudio(file, error) {
  var message = ': error: failed JSON validation';
  var line = error.location ? error.location.start.line : undefined;
  if (line !== undefined) {
    var column = error.location.start.column;
    return file + '(' + line + ',' + column + ')' + message;
  }
  return file + message;
};
