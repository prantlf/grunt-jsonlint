module.exports = function formatForVisualStudio(file, error) {
  var line = error.hash ? error.hash.loc.first_line : error.location.start.line;
  return file + '(' + line + '): error: failed JSON validation';
};
