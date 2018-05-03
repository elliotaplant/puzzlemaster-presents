const fs = require('fs');

// The letters of Switzerland can be rearranged to spell lizard and newts - lizard being the singular name of an animal and newts as a plural. Name another country with the same property. That is name another country whose letters can be rearranged to name two animals, one singular and one plural. It's a major country. What country is it?

function loadAnimals() {
  return loadFileAsArray('allAnimals.txt');
}

function loadAllWords() {
  return loadFileAsArray('../wordSupplies/allWords.txt');
}

function loadCountries() {
  return loadFileAsArray('allCountries.txt');
}

function loadFileAsArray(filename) {
  const fileAsString = fs.readFileSync(filename, 'utf8');
  return fileAsString.split('\n');
}

// Create all pairs of animals
function allAnimalPairs() {
  const allAnimals = loadAnimals();
  const flattenedPairs = []
  // For each animal
  allAnimals.forEach(singularAnimal => {
    // For every other animal
    allAnimals.forEach(pluralAnimal => {
      const combined = `${singularAnimal} ${pluralAnimal}`
      const combinedPlural = `${singularAnimal} ${pluralAnimal}s`
      flattenedPairs.push([smooshSort(combined), combined]);
    });
  });

  return flattenedPairs;
}

function smooshSort(str) {
  return str.replace(/\s+/g, '').split('').filter(char => char).sort().join('');
}

function smooshedCountries() {
  const allCountries = loadCountries();
  return new Map(allCountries.map(country => [smooshSort(country), country]));
}

function findCountryAnimals() {
  const countries = smooshedCountries();
  const validAnimals = allAnimalPairs().filter(animalPair => countries.has(animalPair[0]));
  // console.log('allAnimalPairs()', allAnimalPairs());
  return validAnimals.map(validAnimal => [countries.get(validAnimal[0]), validAnimal[1]]);
}

console.log('findCountryAnimals()', findCountryAnimals());
