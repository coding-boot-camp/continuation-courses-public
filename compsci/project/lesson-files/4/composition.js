//helper functions to add functionality to our factories
const makeSound = (sound) => {
  return function () {
    console.log(sound);
  };
};

const hunt = (species) => {
  return function () {
    console.log(`The ${species} is on the hunt!`);
  };
};

const beg = () => {
  return function () {
    console.log(`Please can I have a treat?`);
  };
};

//using a compositional based approach, each of our factories can pick and choose what methods to use
function TigerFactory() {
  animal = {
    species: 'tiger',
    sound: 'ROAR',
  };
  return {
    makeSound: makeSound(animal.sound),
    hunt: hunt(animal.species),
  };
}

const stripes = TigerFactory();
stripes.hunt();
stripes.makeSound();

function DogFactory(name, isCute = true) {
  animal = {
    species: 'dog',
    sound: 'woof',
    name: name,
    isCute: isCute,
  };
  return {
    makeSound: makeSound(animal.sound),
    beg: beg(),
  };
}

const spot = DogFactory('spot', true);
spot.beg();
spot.makeSound();

function CatFactory(name, isCute = true) {
  animal = {
    species: 'cat',
    sound: 'meow',
    name: name,
    isCute: isCute,
  };
  return {
    makeSound: makeSound(animal.sound),
    beg: beg(),
    hunt: hunt(animal.species),
  };
}

const fluffy = CatFactory('fluffy', true);
fluffy.hunt();
fluffy.beg();
fluffy.makeSound();
