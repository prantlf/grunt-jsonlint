function padLeft (number, length) {
  number = number.toString();
  var missingLength = length - number.length;
  if (missingLength > 0) {
    number = ' '.repeat(missingLength) + number;
  }
  return number;
}

module.exports = function reportLikeJshint(file, error, grunt) {
  var line, exzerpt, pointer, reason;
  if (error.hash) {
    line = error.hash.loc.first_line;
    var lines = error.message.split(/\r?\n/);
    exzerpt = lines[1];
    pointer = lines[2];
    reason = lines[3]
      .replace('Expecting', 'Expected')
      .replace(', got', ' and instead saw');
  } else if (error.location) {
    line = error.location.start.line;
    exzerpt = error.exzerpt;
    pointer = error.pointer;
    reason = error.reason;
  } else {
    return error.message
  }
  var extraLength = pointer.length - 10;
  if (extraLength > 0) {
    pointer = '   ' + pointer.substr(extraLength);
    exzerpt = '...' + exzerpt.substr(extraLength);
  }
  if (exzerpt.length > 20) {
    exzerpt = exzerpt.substr(0, 20) + '...';
  }
  pointer = pointer.replace(/-/g, ' ');
  var prefix = padLeft(line, 6) + ' | ';
  var indent = ' '.repeat(prefix.length);
  return prefix + exzerpt + '\n' + indent + pointer + ' ' + reason;
};
