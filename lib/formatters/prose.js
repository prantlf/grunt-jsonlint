module.exports = function formatForVisualStudio(file, error) {
  var message = 'File "' + file + '" failed JSON validation';
  var line = error.location ? error.location.start.line : undefined;
  if (line != null) {
    var column = error.location.start.column;
    return message + ' at line ' + line + ', column ' + column + '.';
  }
  return message + '.';
};
