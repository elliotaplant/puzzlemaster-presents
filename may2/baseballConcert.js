const fs = require('fs');

// Load all the concert words from the concert words file into a Set
//
// Create an empty list of possible solutions
//
// Load all the baseball names into a List
// For each full name in the baseball list
//   Get the first name from the full name
//   Get the last name from the full name
//   For each letter in the last name
//     For each index in the first name (and one extra)
//       Insert the lastNameLetter at the index in the first name
//       If the created word is in the concert words set
//         Push the name and word to the possible solutions
//
// Hopefully possible solutions has some names and words!

function getBaseballConcertNames() {
  // Load all the concert words from the concert words file into a Set
  const concertWordsSet = loadAllNouns();

  // Create an empty list of possible solutions
  const possibleSolutions = [];

  // Load all the baseball names into a List
  const baseballNames = loadBaseballNames();

  // For each full name in the baseball list
  baseballNames.forEach(name => {
    const separatedNames = name.split(' ');
    // Get the first name from the full name
    const firstName = separatedNames[0];
    // Get the last name from the full name
    const lastName = separatedNames[separatedNames.length - 1];

    checkPermutations(firstName, lastName, concertWordsSet, possibleSolutions);
  });

  return possibleSolutions;
}

function checkPermutations(firstName, lastName, checkSet, solutions) {
  // For each unique letter in the last name
  new Set(lastName.split('')).forEach(lastNameLetter => {
    // For each index in the first name (and one extra)
    for (let i = 0; i <= firstName.length; i++) {
      // Insert the lastNameLetter at the index in the first name
      const wordToCheck = firstName.slice(0, i) + lastNameLetter + firstName.slice(i);
      // If the created word is in the concert words set
      if (checkSet.has(wordToCheck)) {
        // Push the name and word to the possible solutions
        solutions.push([`${firstName} ${lastName}`, wordToCheck]);
      }
    }
  });
}

function loadConcertWords() {
  return new Set(loadFileAsArray('concertWords.txt'));
}

function loadAllWords() {
  return new Set(loadFileAsArray('allWords.txt'));
}

function loadAllNouns() {
  return new Set(loadFileAsArray('allNouns.txt'));
}

function loadBaseballNames() {
  return loadFileAsArray('baseballNames.txt');
}

function loadFileAsArray(filename) {
  const fileAsString = fs.readFileSync(filename, 'utf8');
  return fileAsString.split('\n');
}

console.log('getBaseballConcertNames()', getBaseballConcertNames());
