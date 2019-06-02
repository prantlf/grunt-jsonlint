module.exports = function formatForVisualStudio(file, error) {
  var line = error.location ? error.location.start.line : undefined;
  var message = 'File "' + file + '" failed JSON validation'
  return line != null ? message + ' at line ' + line + '.' : message + '.'
};
