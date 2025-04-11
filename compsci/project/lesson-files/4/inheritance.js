//using subclasses

class Animal {
  constructor(species, sound, numLegs) {
    this.species = species;
    this.sound = sound;
    this.numLegs = numLegs;
  }
  makeSound() {
    console.log(this.sound);
  }
}

class Tiger extends Animal {
  constructor() {
    super('tiger', 'ROAR', 4);
  }
  hunt() {
    console.log(`The ${this.species} is on the hunt!`);
  }
}

const tony = new Tiger();
tony.makeSound();
tony.hunt();

class Dog extends Animal {
  constructor(name, isCute = true) {
    super('dog', 'woof', 4);
    this.name = name;
    this.isCute = isCute;
  }
  beg() {
    console.log(`please can I have a treat?`);
    this.makeSound();
  }
}

const fido = new Dog('Fido', true);
fido.beg();

class Cat extends Animal {
  constructor(name, isCute = true) {
    super('cat', 'meow', 4);
    this.name = name;
    this.isCute = isCute;
  }
  hunt() {
    console.log(`The ${this.species} is on the hunt!`);
  }
  beg() {
    console.log(`please can I have a treat`);
    this.makeSound();
  }
}

const garfield = new Cat('Garfield');
garfield.beg();
garfield.hunt();
