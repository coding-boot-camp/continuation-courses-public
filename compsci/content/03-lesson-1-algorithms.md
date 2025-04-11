## Introduction

Computer science fundamentals and concepts can greatly improve both the efficiency of your code and your overall skills as a developer. Understanding how to maximize the efficiency of the code you write is an invaluable skill for a modern developer, and by incorporating design patterns and data abstractions you can greatly improve the runtime of your applications. 

In this lesson, you will learn how to do the following:

* Define what an algorithm is.

* Implement a linear searching algorithm.

* Understand recursive patterns and implement a binary searching algorithm.

* Explain time complexity and Big O notation.

## Preview

This lesson is focused on searching algorithms and understanding time complexity and big O notation. 

This lesson contains the following steps:

1. Define algorithms in a computer science context.

2. Create a linear searching algorithm.

3. Explain recursive patterns.

4. Create a binary searching algorithm.

5. Explore and understand time complexity via Big O notation.

Let's get started!

## What is an algorithm?

Even though most of us will apply for JavaScript-related jobs, technical interviews typically also assess our knowledge of a few general computer science topics. It is important for us to understand these topics to not only improve our steps as a developer but also to increase our chances of passing a technical interview.

In computing, an algorithm is a self-contained series of steps that describes a way to solve a problem for a human or machine.

An algorithm is an abstracted idea of how to solve a problem. In contrast, a function is a means of implementing the steps outlined by the algorithm.

As JavaScript developers, understanding algorithms helps us think about a problem in a conceptual and abstract way, allowing us to come to a better and more efficient solution &mdash;ultimately making us better developers!

At the most basic level, algorithms are nothing more than a set of instructions provided to a computer to solve a problem, similar to a recipe. Let's take a look at some common algorithms next.

## Linear Search

Imagine you are given a list of data (for this thought experiment, let's say they are numbers) and a value to find in that data set. How would you go about doing this?


Oe approach you could use is to test each value against the value you are searching for. Imagine this array of numbers:

```js
const numbers = [2,3,5,7,12,100]
```

Using the approach outlined above, if we were asked to find the index of the number `12`, we could compare each element in the array against that value.

When we find that element, we return the index of where it appeared and then stop the function. This is called a **linear search algorithm**.

If we don't find the element we're looking for, a common pattern is to return a `-1`, as that index cannot exist in a JavaScript array. 

Let's build this! Create a new file in VSCode called `linearSearch.js`. In that file, create a function called `linearSearch` that takes in two parameters: an array of numbers and a value to search for:

```js
const linearSearch = (array, element)=>{}
```

Try to implement a linear searching algorithm. Assume you will receive an array of numbers. Your function should return the index of the first element that matches the value you are searching for. If that value does not exist in the array, your function should return -1.

If you get stuck, consider the following:

* How could we perform an operation on each element in the array?

* How can we escape our function early if we find the value we are looking for?

Let's take this step by step. First, we can use a `for` loop to create a block of code we can reuse for every element in the array:

```js
for (let i = 0; i < array.length; i++) {
   ...
}
```

Next, we can use the strict equality operator and an `if` statement to compare the current value to the value we are searching for. If they match, we can use an early `return` to stop execution of the loop and function:

```js
if (array[i] === element) {
   return i;
}
```

Finally, if we get through our entire loop without finding a match, we return `-1`:

```js
return -1
```

To test that our solution works, we can execute the `linearSearch` function with parameters we expect to return a positive value, and again with values we expect to return `-1`, like the following example:

```js
//expect to return 2
console.log(linearSearch([1, 2, 3, 5], 3));
//expect to return -1
console.log(linearSearch([1, 2, 3, 5], 4));
```

Your final function should look like the following:

```js
const linearSearch = (array, element) => {
 for (let i = 0; i < array.length; i++) {
   if (array[i] === element) {
     return i;
   }
 }
 return -1;
};

//expect to return 2
console.log(linearSearch([1, 2, 3, 5], 3));
//expect to return -1
console.log(linearSearch([1, 2, 3, 5], 4));
```

Congratulations, you just created a classic computer science algorithm, the linear search function!

Note that in our previous example, the numbers in our array are sorted. If we assume a sorted data set, is there a more efficient method for searching through it? For example, if you were to look up a word in the dictionary, would it make sense to start at the beginning and check every individual word? Or is there perhaps a more efficient solution?

## Recursion

Let's put a pin into our searching algorithms for a moment. A **recursive** function is a function that calls itself. Recursion is a useful pattern for a repeated process with an unknown number of steps. In the following example, we use recursion to create a countdown timer:

```js
const countdown = (value) => {
 // for all values more than 0, logs the value then calls the function with a smaller argument
 if (value > 0) {
   console.log(value);
   // recursive call creates the loop
   return countdown(value - 1);
 } else {
   // base condition stops the recursive call
   return value;
 }
};

countdown(10);
```

Let's break down this code piece by piece. First, we define a function, `countdown`, which takes a starting number as a parameter called `value`:

```js
const countdown= (value)=>{
 ...
}
```

We log the current value of the parameter, then call the entire function again, this time reducing the value by 1:

```js
if(value>0){
 console.log(value);
   // recursive call creates the loop
   return countdown(value - 1);
}
```

Recursive functions need an **escape condition** to ensure the function doesn't continue to call itself infinitely until the computer runs out of memory and crashes. This allows the function to stop running, or escape, when a certain condition is met.  In our case, when our countdown value reaches zero, we stop the function:

```js
else {
 return value;
}
```

Bringing it all together, our function will accept a starting number, log said value, and countdown from said value to zero. Once the value reaches zero, we stop the recursion by not calling the function again:

```js
const countdown = (value) => {
 // for all values more than 0, logs the value then calls the function with a smaller argument
 if (value > 0) {
   console.log(value);
   // recursive call creates the loop
   return countdown(value - 1);
 } else {
   // base condition stops the recursive call
   return value;
 }
};

countdown(10);
```

## Binary Search

Let's come back to the searching example. Imagine you are looking for a word in a dictionary, like "recursion". We know the words in the dictionary are sorted alphabetically. Our previous searching algorithm, linear search, would start with the very first word in the dictionary, something like "algorithm". If that isn't the word we are looking for, we move on to the next word, something like "alligator". This will eventually lead to "recursion", but it is not an efficient solution. Additionally, if the word we are looking for is not in the dictionary, we will need to check every single word to confirm this. 

Instead, a more practical solution to this issue would be to open the dictionary somewhere toward the middle, determine if the word selected, let's say "modulus", comes before or after the word you are looking for, then repeat this pattern until you find the word you are looking for. 

This pattern is called a **binary search**, because each iteration removes half of the remaining possible options.  Imagine you are playing a guessing game with a friend. They tell you to pick a number from 1-100, and will tell you if your guess is too high or too low. Let's imagine their chosen number is 62. In a linear search, we will first guess 1, then 2, etc, until we finally find the result. This is inefficient because it ignores the fact that the numbers are in order. A more efficient solution would be to start at 50, then 75, then 63, etc. 

Going back to our array search example, let's implement these concepts into a binary search algorithm. We want to find a value in an array and return the index of said value in said array. First, we create a function that accepts two arguments: an array to search and an element to search for:

```js
function binarySearch (array, element) {
 ...
}
```

Next, we create two variables, one for the `start`, or smallest possible matching index, and one for the `end`, or largest possible matching index. These values will be reassigned as we eliminate possible elements, so we define the with the `let` keyword:

```js
let start = 0;
let end = array.length - 1;
```

Next, we need to search for our element in the array. We use a `while` loop to continue running these steps until we find the correct value. We determine a midpoint in the array between the `start` and `end` indexes and set that value as the variable `mid`:

```js
while (start <= end) {
 let mid = Math.floor((start + end) / 2);
 ...
}
```

If the midpoint array value is equal to the value we are searching for, we return the midpoint index:

```js
if (array[mid] === element) {
 // We must return the mid value, which represents the index value, once we have found the element being searched for.
 return mid;
}
```

If the value we are searching for is greater than the element in the middle of the array, that means we can safely eliminate all elements up to the middle array element. We do this by shifting our `start` variable to the next element in the array after our current `mid`:

```js
else if (array[mid] < element) {
     start = mid + 1;
}
```

If the value we are searching for is less than then element in the middle of the array, we eliminate all elements from the middle element to the end of the array by shifting our `end` variable to the previous element from the current `mid`:

```js
else {
 end = mid - 1;
}
```

Because we put all these conditions in a `while` loop, we will continue this comparison until the condition defined in our loop is met. In this case, once the `start` variable is greater than the `end` variable, our loop will start running. This will only happen in the case where our value doesn't exist in the array, so we return `-1`:

```js
function binarySearch(array, element) {
 let start = 0;
 let end = array.length - 1;

 while (start <= end) {
   ...
 }
 // If we do not find the element we need to return false.
 return -1;
}
```

To test this algorithm, we can call the function, passing in a pre-sorted array and value to search for, and log the result:

```js
// The array must be sorted for binary search to work.
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function binarySearch(array, element) {
 ...
}


console.log(binarySearch(arr, 7));//=> should return 6
```

Bringing it all together, our final solution should look like this:

```js
// The array must be sorted for binary search to work.
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function binarySearch(array, element) {
 let start = 0;
 let end = array.length - 1;

 while (start <= end) {
   let mid = Math.floor((start + end) / 2);

   if (array[mid] === element) {
     // We must return the mid value, which represents the index value, once we have found the element being searched for.
     return mid;
   } else if (array[mid] < element) {
     start = mid + 1;
   } else {
     end = mid - 1;
   }
 }
 // If we do not find the element we need to return false.
 return -1;
}

console.log(binarySearch(arr, 7)); //should return 6
```

Congratulations, we have now created a binary search algorithm! We understand, intuitively, this solution is more efficient than a linear search, but how can we quantify this? What do we actually mean by "efficient", when talking about code?

## Efficiency and Big O Notation

All programs we write can be thought of as a series of steps. a "step" can be any operation a computer must perform, such as creating a variable, comparing values, or basic math. Remember, all computers have a limit to the number of operations, or steps, they can perform, so the fewer steps the computer must do, the easier it is for the computer to do it. When we talk about **efficiency** in programming, we are basically talking about reducing the number of steps in our programs.

Additionally, our programs are often dealing with very large datasets. When such factors are in play, our primary concern regarding efficiency is not about exactly how many operations, or steps, a program needs to run, but about how many more operations need to be run as the size of the input dataset changes. We refer to this concept as **time complexity**, as in, how much does the program slow down as input size grows.  

Let's take a look at this concept in action. Take a look at this function:

```js
function logFirstElement(arr){
 console.log(arr[0])
}
```

This function accepts an array as a parameter and then logs the first element in said array. To determine the time complexity of this function, imagine calling it with an array with 3 items. How many steps does it need to take? Now imagine running it with an array with 250 items.  How many steps does it take in this case?

In both instances, the program only has to perform one step, logging the first element of the array. We can deduce that the number of steps (and therefore the time it takes) to run this program does not change as input grows. We refer to this as **constant time complexity**, meaning runtime is constant regardless of input size.

In programming, we use **Big O Notation** as shorthand for expressing the time complexity of our algorithms. Big O notation uses a capital letter "O" to represent the number of operations the program would need to run at minimum input size with a growth factor (representing how runtime changes with input size) in parentheses. For the previous example, the number of operations does not change based on input size, so we would express the runtime as O(1). 

Now imagine we modified the previous function like so:

```js
function logFirstElement(arr){
 const firstElement = arr[0];
 const tripledFirstElement = firstElement * 3
 console.log(tripledFirstElement)
}
```

What is the time complexity of this function expressed in Big O notation? Well, let's imagine we run it with an array with 3 elements. The program has to perform 3 operations, creating 2 variables and then logging one of them. What if we run the same function with an array with 1000 elements? The program still needs to perform exactly 3 operations. Remember, Big O notation is concerned with how runtime changes as input grows, not with exactly how many operations are run. The runtime of this program is also O(1), since the number of steps does not change based on input size.

Let's take a look at another example:

```js
function logElements (arr) {
 for (let i = 0; i < arr.length; i++) {
   console.log(arr[i])
 }
}
```

To calculate the time complexity of this algorithm, imagine running it with an array of 5 elements. How many steps does it need to take? Now imagine running it with 500 elements. How many steps does it take this time?

Since the function logs every element in the array one at a time, it needs to perform 5 steps for an array of 5 elements and 500 steps for an array of 500 elements. Remember, time complexity measures how the runtime changes as input grows.  In this case, the function must run one operation for every inputted element. We can express this as O(n), where `n` represents the length of the array. 

Let's take a look at one more example, a function to find any duplicate values in a provided array:

```js
function findDuplicates (arr){
 const duplicates = [];
 for( let i = 0; i<arr.length; i++){
   let element = arr[i];
   for (let j=0; j<arr.length;j++){
     if(i===j){
       continue
     }else if(element === arr[j]){
       if (!duplicates.includes(element)){
         duplicates.push (element)
       }
     }
   }
 }
 return duplicates;
}
```

What is the runtime complexity of this function? Let's imagine we run it with an array of two elements:

```js
findDuplicates([2,3]);
```

The function takes each element of the array and compares it against every other element in the array. In this example, we can visualize it as follows:

1. i=0 and j=0, so we skip this comparison.

2. i=0 and j=1, so we compare the values at those indices.  Since 2 and 3 are not the same number, we move on.

3. At this point we have reached the end of the array, so we increment the first loop. i=1 and j=0, so we compare the values, 2 and 3, which are not the same.

4. Finally, i=1 and j=1, so we skip the last comparison.

So when the input array had 2 elements, we had to perform 4 steps.  Let's do the same thing, but with a 3 element array:

```js
findDuplicates([2,3,2]);
```

The step-by-step breakdown looks like this:

1. i=0 and j=0, so the comparison is skipped.

2. i=0 and j=1, but the values at those indices, 2 and 3, do not match, so the program moves on.

3. i=0 and j=2, values at those indices are compared, 2 and 2, so we check if that value exists in our duplicates array, which it does not, so we add it.

4. i=1 and j=0, but values are not the same.

5. i=1 and j=1, so the comparison is skipped.

6. i=1 and j=2, but the values are not the same.

7. i=2 and j=0, the values are the same, but said value (2) already exists in the duplicates array, so it is not added.

8. i=2 and j=1, but the values are not the same.

9. i=2 and j=2, so the comparison is skipped.

When the input array has 3 elements, the program runs 9 steps. You may have noticed a pattern, the number of steps the program runs is equal to the square of the input array size. This is called **quadratic time complexity**, and can be expressed as O(n^2)

Broadly, Big O notation can be broken down into a number of classes:

  - Constant time complexity: Runtime is constant, like the `logFirstElement` function. Expressed as O(1).

 - Linear time complexity: Runtime grows at the same rate as input, like the `logElements` function. Expressed as O(n).

 - Quadratic time complexity: Runtime grows at a rate equal to input size squared, like the `findDuplicates` function. Can be expressed as O(n^2)

This is just a small subset of Big O classes, but most of the functions you write will fall into one of these classes. During coding interviews, a common question is to calculate the Big O notation of the solution you have built.  Always keep efficiency in mind when building your programs.

Going back to our linear and binary search algorithms, let's calculate the time complexity of these two solutions. What is the time complexity of a linear search algorithm?

In the best case scenario, where the value we are searching for is the first item in the array, the linear search will only take one operation. However, in the worst case scenario, where the value we are searching for is at the far end of the array or not in the array at all, every item in the array will need to be checked. So how can we express this in Big O notation?

Typically, when calculating Big O notation, focus on the worst-case scenario. For a linear search, the worst case scenario would be either the very last item in the array or an item that isn't in the array at all. Since we would need to check every item in the array to ensure the value we are looking for doesn't exist in said array, the time complexity is therefore O(n).

Calculating the time complexity of a binary search algorithm is more complicated. Let's walk through a couple of scenarios. Given the array `[1,2,3,4,5,6,7]`, if we are looking for the value `7`, we would first compare the middle value (4) to our goal value (7). Since 7 is greater than 4, we can eliminate all numbers up to 4.  using the remaining dataset (`[5,6,7]`), we again compare our middle value (6) to our goal value (7). We can now eliminate half of the remaining values, as 7 is greater than 6.  We only have one value left to check, and we find the value we are searching for.  So, when our input array had 7 elements, our worst-case scenario took 3 comparisons.  If we expand the dataset to include all numbers 1-100, we can find the value we are looking for in just 7 comparisons.  So which Big O class does this fit into?

The time complexity of a binary search is O(log(n)). The **logarithm** expression returns how many times you must divide the number by a base value to get to 1. In this case, we are talking about base 2 logarithms, as in, how many times must you divide by zero to reach one. Some examples:

- `log(2)` = 1

- `log(8)` = 3

- `log(32)` = 5

A logarithmic time complexity also means that runtime doubles as the size of the input is squared, making it significantly more efficient than linear (0(n)) time complexity.

## Reflection

Great work completing the first lesson! A baseline understanding of computer science will greatly improve both your skills as a developer and help you land a job as a professional developer, and we are wll on our way.

In this lesson, you learned the following:

* How to define an algorithm.

* How to implement linear and binary search algorithms.

* What recursive patterns are and how to implement them.

* How to calculate time complexity and Big O notation.

These concepts form a fantastic foundation on computer science, which will greatly improve your skills as a developer. Going forward, think about the efficiency trade offs of each algorithm you write. It's very common for interviewers to ask you to calculate the Big O notation of solutions you write, so be mindful of that when coding your solutions.

We focused on searching through a sorted dataset in this lesson, but how can we sort the data? Next up, we will explore common sorting algorithms and how to implement them.

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
