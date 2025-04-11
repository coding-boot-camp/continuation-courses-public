## Introduction

To keep our code clear and well organized, we need an organizational system in addition to data structures and algorithms. These **coding paradigms** keep our code organized, well structured, and easy to maintain.

We actually have already explored a coding paradigm with Object Oriented Programming, or OOP. To recap, in OOP, all of our code is contained in classes and constructed objects. These classes can be extended to add additional functionality, and classes can interact with each other to form a fully functioning application. This paradigm focuses on clear separation of concerns by encapsulating all data and associated logic into individual classes. 

In this lesson we will be looking at another common coding paradigm: **functional programming**. In a functional programming paradigm, all code is broken down into functions. Contrast this with object oriented programming (OOP), wherein all code is encapsulated in objects. 

In this lesson you will learn how to do the following:

* Explain the functional programming paradigm and contrast it with object oriented programming.

* Use closures to keep JavaScript data private.

* Understand and implement factory functions.

* Compare and contrast factory functions and constructor functions.

## Preview

This lesson is focused on functional programming, factory functions, closures, and their implementation in JavaScript.

This lesson contains the following steps:

1. Define the functional programming paradigm.

2. Define higher order functions and pure functions.

3. Compare functional programming with object oriented programming.

4. Define JavaScript closures.

5. Implement JavaScript closures.

6. Define factory functions.

7. Implement factory functions in JavaScript.

8. Compare factory functions with constructor functions.

Let's get started! 

## What is Functional Programming?

Coding paradigms are a great tool for maintaining consistent organization and structure across a collaborative coding project. In the functional coding paradigm, all code is broken down into functions. This allows for easier testing and task delegation, as each task is broken down into an independent reusable function. 

In order to fully implement this paradigm, we are going to need add a few new concepts: higher order functions and pure functions.

A **higher order function** is a function that either takes in another function as an argument, returns a function, or both. Higher order functions are a useful tool in a functional paradigm since they allow us to combine the functionality of multiple different functions together. 

We have actually used several higher order functions in our previous assignments. For example, the `.map()` method is a higher order function, since it takes in a function as an argument. 

Higher order functions can also return functions. For example, we could create a function that takes in a numeric argument and returns a function that will add that number to any provided input: 

```js
function makeSum(val) {
  return function returnFunc(num) {
    console.log(val + num);
  };
}
```

In this example, when we call the `makeSum` function with `5` as an argument, it will return a new function we call `add5`. If we execute that `add5` function, it will log the initial value provided to the `makeSum` function, which was `5`, added to the argument passed into the returned function:

```js
const add5 = makeSum(5);
add5(8); //=>13
add5(3); //=>8
add5(-1); //=>4
```

The advantage provided by this pattern is the reusability. If we needed another function that will add a specific value to a provided input, we can easily do so:

```js
const add13 = makeSum(13);
add13(9); //=>22
add13(1); //=>14
add13(12); //=>25
```

Higher order functions like these are invaluable when using a functional paradigm, allowing us to create reusable, modularized code.

In addition to higher order functions, pure functions are an important tool for functional programming. **Pure functions** are predictable, meaning the always return the same output when given a specific input. In addition, pure functions have no **side effects**, meaning they do not modify anything outside of scope of the function itself.  

Let's take a look at a few examples. This function takes in two values and returns the sum of them added together:

```js
function pureSum(num1, num2) {
  return num1 + num2;
}
```

This is a pure function. This function will always return the same result when called with the same inputs, and it does not modify anything outside of it's scope, so it has no side effects.

Let's rewrite this function so that instead of returning the sum it updates a global variable with the sum:

```js
let sum = 0;
function impureSum(num1, num2) {
  sum = num1 + num2;
}
```

This function performs the same operation, but it contains a side effect: it updates a variable outside of its own scope. Therefore, this is not a pure function.

In this next example, the function takes in an array and returns a random element in that array:

```js
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

While this function does not have any side effects, it is not predictable, since the output is not consistent when called repeatedly with the same input. Therefore, this is also not a pure function.

A combination of higher order functions and pure functions is crucial to implement a functional coding paradigm. Since they are predictable and have no side effects, pure functions can easily be worked on and tested in isolation from other parts of a project. Higher order functions provide flexibility to our code, allowing us to combine multiple functions together to create robust, predictable applications. 

## Closures

One drawback of JavaScript is that all object properties are **public** properties, meaning they can be accessed anywhere in your code, by any other function. In most other programming languages, like Java, object properties can be assigned **access modifiers**, which control what other parts of your code can access the data. This functionality does not exist in JavaScript.  

To recreate this functionality, we use a type of function called a **closure**. Closures are functions returned from other functions that retain access to that higher function's scope. This allows us to create private variables that can be updated by the returned function but cannot be accessed anywhere else. 

Let's take a look at an example. This function creates a locally scoped variable `count` and returns a function. The returned function is a closure, since it can access the variables created in the `counter` function:

```js
function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
```

This higher order function is returning a function, so we set the returned function to a variable we call `increment` then call it 3 times:

```js
const increment = counter();
increment(); // => logs 1
increment(); // => logs 2
increment(); // => logs 3
```

Because the returned function was originally created within the `counter` function, it can access any variables created within the `counter` function as well. In this instance, that means each time `increment` is called, the `count` variable is incremented by 1 and logged. However, since the `count` variable does not exist in global scope. If we try to access the `count` variable directly, our code with throw an error:

```js
console.log(count); //=> throws error
```

Since the `count` variable is only accessible from the function returned by our `counter` function, we have full control over what parts of our code is able to access it. This gives us more privacy and security over our data.

Additionally, since the `count` variable is created within the `counter` function, each time we call the `counter` function will create a new private instance of the `count` variable. In this example, we call counter a second time, set the return function to a variable called `secondInc`, and call the `secondInc` function, which logs `1`:

```js
const secondInc = counter();
secondInc(); //logs 1
```

By leveraging closures we can greatly improve the security and reusability of our code, since they allow us to create privately scoped variables with their own internal state tracking. 

Next, let's take a look at a practical use for closures, factory functions.

## Factory Functions

In object oriented programming, we use constructor functions to generate objects of the same shape, as in, objects with the same properties and types. This allows for greater predictability and ultimately fewer bugs in our code, since every object will always have the same properties.

**Factory functions** are the functional programming equivalent of constructor functions. Like constructors, factory functions return an object of a specific shape. However, factory functions also return a closure, allowing us to store private data and use them in a functional programming paradigm. 

Let's take a look at an example. Here, we have created a class `BankAccount` that takes in two arguments, `checking` and `savings`, and returns an object with those properties:

```js
class BankAccount {
  constructor(checking = 0, savings = 0) {
    this.savings = savings;
    this.checking = checking;
  }
}
```

The `deposit` method accepts two arguments, `acct` and `amt`, and will deposit that amount into the listed account:

```js
deposit(acct, amt) {
    if (amt < 0) {
        return 'invalid amount, please enter a positive value';
    }
    if (acct === 'savings') {
        this.savings += amt;
    } else {
        this.checking += amt;
    }
}
```

The `displayFunds` method will log the current balance in both accounts:

```js
displayFunds() {
    console.log(
        `Checking: $${this.checking.toFixed(2)}\nSavings: $${this.savings.toFixed(
        2,
        )}`,
    );
}
```

We instantiate the class using the `new` keyword and save our instance to a variable called `myAcct`. We then call the `deposit` method to add funds to our savings account and call `displayFunds` to log the current value in each of our accounts:

```js
const myAcct = new BankAccount(1000, 400);
myAcct.deposit('savings', 50.45);
myAcct.displayFunds();
```

When we run this code, we can see the current values in both our accounts:

```ssh
Checking: $1000.00
Savings: $450.45
```

Constructor functions return JavaScript objects, which mean any properties on that object can be modified from anywhere in your code. In this example, we subtract 900 dollars from our checking account and log the result:

```js
myAcct.checking -= 900;
myAcct.displayFunds();
```

The resulting log shows our checking account has decreased by 900 dollars:

```ssh
Checking: $100.00
Savings: $450.45
```

This is not ideal, as data that should be private can be accessed from places it shouldn't be, whether accidentally or nefariously. 

Instead, let's rebuild this same functionality with a factory function. To do so, we create our factory, `BankAccountFactory`, which takes in the same arguments, `checking` and `savings`. Factory functions do not have constructors, so instead we create a scoped variable, `accounts`, to hold our `checking` and `savings` values:

```js
function BankAccountFactory(checking = 0, savings = 0) {
  const accounts = {
    checking,
    savings,
  };
  ...
}
```

Our factory function is going to return a closure. In this case, we want multiple functions that have access to our scoped `accounts` variable, so we wrap them in an object. Note that we use the `accounts` variable instead of the `this` keyword to access our account data:

```js
return {
    deposit: function (acct, amt) {
        if (amt < 0) {
            return 'invalid amount, please enter a positive value';
        }
        if (acct === 'savings') {
            accounts.savings += amt;
        } else {
            accounts.checking += amt;
        }
    },
    displayFunds: function () {
        console.log(
            `Checking: $${accounts.checking.toFixed(
                2,
            )}\nSavings: $${accounts.savings.toFixed(2)}`,
        );
    },
};
```

Factory functions are not constructors, so they are not instantiated with the `new` keyword. Instead, we call them as we would any other function. In this case, we store the returned object as a variable called `acct` and call the `displayFunds` function:

```js
const acct = BankAccountFactory(2000, 20);
acct.displayFunds();
```

Our console shows the values we added to each account: 

```ssh
Checking: $2000.00
Savings: $20.00
```

When we call the `deposit` method, it will add the provided amount to the provided account:

```js
acct.deposit('checking', 2500);
acct.displayFunds();
```

We can see the updated account values logged in our console:

```ssh
Checking: $4500.00
Savings: $20.00
```

Since the account information is stored in a locally scoped variable, it cannot be accessed outside of the `acct` object's methods. If we attempt to access the data in the `accounts` object, we get an error:

```js
accounts.checking -= 1000;  //throws error, accounts is out of scope
```

Factory functions are a nice addition to a functional coding paradigm, since they allow us to create repeatable predictable objects while keeping our data private. But what about inheritance? Can we create sub factories like we would with sub classes?

Let's explore an example. First, using OOP, we create a base `Animal` class, which takes in `species`, `sound`, and `numLegs` properties and sets those properties onto the returned object. Additionally, a `makeSound` method will log the current animal's sound:

```js
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
```

We can extend this class to add additional functionality. First, we create a `Tiger` class, which calls the `Animal` class constructor with the information for a tiger, then creates a `hunt()` method which will log that the tiger is on the hunt:

```js
class Tiger extends Animal {
  constructor() {
    super('tiger', 'ROAR', 4);
  }
  hunt() {
    console.log(`The ${this.species} is on the hunt!`);
  }
}
```

We instantiate the class and save the result as a new variable called `tony`. This instance has access to the `makeSound` method defined in the parent `Animal` class along with the `hunt` method defined in the `Tiger` class:

```js
const tony = new Tiger();
tony.makeSound();
tony.hunt();
```

One of the advantages of classes like these are their flexibility. For example, we can again extend our `Animal` class into a `Dog` class:

```js
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
```

Since the `Dog` class is extended from the `Animal` class, we have access to all properties and methods defined in both classes. So when we call the `beg` method, that method can reference the `makeSound` method defined in the `Animal` class. In this example, we create an instance of our `Dog` class, save it to a variable called `fido`, then call the `beg` method:

```js
const fido = new Dog('Fido', true);
fido.beg();
```

As a result, we can see both the log from the `beg` method and `makeSound` method in our console:

```ssh
please can I have a treat?
woof
```

This pattern works well when your data can modeled in straight paths. But this inheritance pattern has drawbacks. Each class can only extend a single other class.

Imagine we wanted to create a new class for cats. Cats can hunt, like tigers, so we could extend off the `Tiger` class. But cats also beg, like dogs, so we could extend off the `Dog` class. Neither of these choices are great. We could create an intermediary `Feline` class, from which we could extend our `Cat` and `Tiger` classes, but this is getting a little bloated. Switching to factory functions can solve this problem. 

Instead of extending classes into sub classes, factory functions take a compositional approach, wherein each factory can be composed of several general use functions. This allows us to mix and match methods between our classes without the inheritance problems OOP introduces.

Let's rebuild our animals example with composed factory functions. Instead of creating a generic `Animal` class to extend from, we first create a some higher order helper functions to use in our factories:

```js
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
```

These functions will take the inputted data and return a function that uses that data to perform the associated action. We can use these higher order functions in our factories to add functionality to them. For example, our `TigerFactory` function creates a locally scoped object, `animal`, to store it's data privately, then returns an object with two methods. The `makeSound` method uses our `makeSound` helper function to generate a function that will log the animals sound, while the `hunt` method uses  the `hunt` helper function to generate a function that will let us know the tiger is on the hunt:

```js
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
```

Next we call our `TigerFactory()` function and set the result to a variable called `stripes`. We then use the `hunt` and `makeSound` methods from that object:

```js
const stripes = TigerFactory();
stripes.hunt();
stripes.makeSound();
```

When we log our data in the console, we can see the data from the `TigerFactory` properly logged:

```ssh
The tiger is on the hunt!
ROAR
```

For our `DogFactory` function, we again create a locally scoped object called `animal` to hold our data, then return an object. The returned object includes a `makeSound` method that uses the `makeSound` helper function to create a function that will log the dogs sound, and a `beg` method that uses the `beg` helper method to do the same thing:

```js
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
```

Next we call our `DogFactory()` function and set the result to a variable called `spot`. We then use the `beg` and `makeSound` methods from that object:

```js
const spot = DogFactory('spot', true);
spot.beg();
spot.makeSound();
```

When we log our data in the console, we can see the data from the `DogFactory` properly logged:

```ssh
Please can I have a treat?
woof
```

The main advantage of this compositional approach is that it allows us to mix and match functionality between factory functions. For example, if we wanted to create a `CatFactory` that could both hunt and beg, we can easily combine those pieces of functionality using our compositional approach:

```js
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
```

To test this functionality, we call our `CatFactory` function and save the result to a variable called `fluffy`. We then call all three methods from the returned object:

```js
const fluffy = CatFactory('fluffy', true);
fluffy.hunt();
fluffy.beg();
fluffy.makeSound();
```

In our console, we can see all the functionality behaves as we expect:

```ssh
The cat is on the hunt!
Please can I have a treat?
meow
```

By taking a compositional approach, we can add complex functionality to multiple factory functions without duplicating code, and since factory functions return closures, we can keep all our data private and secure.  

## Reflection

Congratulations on completing this lesson! Programming paradigms are a powerful tool to ensure code style standards across a team, allowing for easier collaboration and testing.  By learning to implement coding paradigms, you will both improve the reusability and modularization of your code and increase you chances of getting hired as a developer. Great work!

In this lesson, you accomplished the following:

* How to define the functional programming paradigm.

* How to define higher order functions and pure functions.

* How to compare functional programming with object oriented programming.

* How to define JavaScript closures.

* How to implement JavaScript closures.

* How to define factory functions.

* How to implement factory functions in JavaScript.

Congratulations on completing the fundamentals of computer science! Computer science is a fundamental skill for all developers.  With these new skills, you will be able to write more efficient, performant, modular code. Great job!

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
