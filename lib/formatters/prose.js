module.exports = function formatForVisualStudio(file, error) {
  var line = error.hash ? error.hash.loc.first_line : error.location.start.line;
  return 'File "' + file + '" failed JSON validation at line ' + line + '.';
};
