const fs = require('fs');

// utility methods
function loadFileAsArray(filename) {
  const fileAsString = fs.readFileSync(filename, 'utf8');
  return fileAsString.split('\n').filter(i => i);
}

module.exports = {
  loadFileAsArray
}
