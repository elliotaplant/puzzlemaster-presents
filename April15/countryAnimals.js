const {loadFileAsArray, timer} = require('../utils');
const stop = timer();

// The letters of Switzerland can be rearranged to spell lizard and newts - lizard being the singular name of an animal and newts as a plural. Name another country with the same property. That is name another country whose letters can be rearranged to name two animals, one singular and one plural. It's a major country. What country is it?

// Loads all the singular animals in array form (eg ['aardvark', 'bat', 'bear', ...])
function loadAnimals() {
  return loadFileAsArray('allAnimals.txt');
}

// Loads all the plural animals in array form (eg ['albatross', 'antelopes', 'ants', ...])
// Note that these are necessary because some animals have plurals that don't end in 's'
// such as 'buffalo' or 'deer'
function loadAnimalPlurals() {
  return loadFileAsArray('allAnimalPlurals.txt');
}

// Loads a list of all the countries
function loadCountries() {
  return loadFileAsArray('allCountries.txt');
}

// A utility method to make words more easily compared by removing whitespace and sorting the characters
// Eg, 'i like cake' => 'aceeiikkl'
function smooshSort(str) {
  return str
    .replace(/\s+/g, '') // Remove whitespace
    .split('') // Turn the string into a list of characters
    .filter(char => char) // Filter out strange falsy characters
    .sort() // Sort the characters alphabetically
    .join(''); // Turn the sorted characters back into a string
}

// Creates a list of paired singular and plural animals with their smooshed form
// Output: [['acdgost', 'cat dogs'], ['acgipst', 'cat pigs'], ...]
function allAnimalPairs() {
  // Load in the list of singular animals
  const allAnimals = loadAnimals();
  // Load in the list of plural animals
  const allAnimalPlurals = loadAnimalPlurals();

  // Initialize an empty array for the pairs
  const flattenedPairs = []
  // For each animal
  allAnimals.forEach(singularAnimal => {
    // For each animal
    allAnimals.forEach(pluralAnimal => {
      // Add an 's' plural of the animal
      const combined = `${singularAnimal} ${pluralAnimal}s`
      flattenedPairs.push([smooshSort(combined), combined]);
    });

    // For every plural animal
    allAnimals.concat(allAnimalPlurals).forEach(pluralAnimal => {
      // Combine the animals without an extra 's' on the plural
      const combined = `${singularAnimal} ${pluralAnimal}`
      flattenedPairs.push([smooshSort(combined), combined]);
    });
  });

  // Return the entire list of smooshed and paired tuples
  return flattenedPairs;
}

// Gets all the countries and creates a map of the smooshed version to the original version
function smooshedCountries() {
  const allCountries = loadCountries();
  return new Map(allCountries.map(country => [
    smooshSort(country),
    country
  ]));
}

// Brings everything together
// returns a map of countries to their animal pairs
function findCountryAnimals() {
  const countries = smooshedCountries();

  // Filters animal pairs who's smooshed versions
  // aren't keys in the countries Map
  const countryAnimals = allAnimalPairs()
    .filter(animalPair => countries.has(animalPair[0]));

  // Removes duplicate animal pairs for a single country
  return new Map(countryAnimals.map(countryAnimal => [
    countries.get(countryAnimal[0]),
    countryAnimal[1]
  ]));
}

console.log('Animal Pairs \n', findCountryAnimals());

console.log('Duration:', stop());
