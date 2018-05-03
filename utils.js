const fs = require('fs');

// utility methods
function loadFileAsArray(filename) {
  const fileAsString = fs.readFileSync(filename, 'utf8');
  return fileAsString.split('\n').filter(i => i);
}

function timer() {
  const start = Date.now();
  return function end() {
    return Date.now() - start;
  }
}

module.exports = {
  loadFileAsArray,
  timer,
}
