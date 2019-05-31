module.exports = function formatForVisualStudio(file, error) {
  var line = error.hash ? error.hash.loc.first_line :
              error.location ? error.location.start.line : undefined;
  var message = 'File "' + file + '" failed JSON validation'
  return line != null ? message + ' at line ' + line + '.' : message + '.'
};
