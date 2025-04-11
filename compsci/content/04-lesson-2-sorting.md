## Introduction

In our previous lesson, we learned about both linear and binary sorting algorithms. But in order for those algorithms to function properly, our data set needs to be sorted. 

Sorting algorithms are a fundamental skill for computer scientists. While dozens of sorting algorithms exist, this lesson will focus on the most common and easy to understand algorithms.

In this lesson you will learn how to do the following:

* Understand the concepts behind insertion, selection, merge, and quick sort algorithms.

* Implement a bubble sort algorithm.

* Implement a merge sort algorithm. 

* Explain the pros, cons, and tradeoffs of various sorting algorithms.

## Preview

This lesson is focused on sorting algorithms and their implementation in JavaScript.

This lesson contains the following steps:

1. Define and implement a bubble sort algorithm.

2. Define selection and insertion sort algorithms.

3. Define merge and quick sort algorithms.

4. Implement a merge sort algorithm.

5. Discuss the tradeoffs between various sorting algorithms.

Let's get started!

## Sorting Algorithms

In order to properly implement a binary searching algorithm, we need our data set to be sorted. Sorting is a common problem encountered in the real world, and several solutions exist to sort a dataset. 

Imagine you are holding a series of numbered cards. How would you go about sorting those cards from lowest number to highest number? Let's take a look at some common ways to solve this problem.

## Bubble Sort

The first sorting algorithm we will explore is a **bubble sort**. A bubble sort involves comparing each element with the element next to it then switching places if they are not in the expected order. This causes the largest number to "bubble" up to the end of the set. We then continue the process until the set is fully sorted. 

Imagine you are trying to line up people from shortest to tallest. One strategy you could take would be to have the two people at the front of the line compare heights, then switch places if the first person is taller than the second. Continue this process with the 2nd and 3rd person, and so on, until the tallest person is at the back of the line. Then, start over, and keep making comparisons and swapping until the line is fully sorted!

Let's build a bubble sort in JavaScript.  First, we define a function that takes in an array as an argument:

```js
const bubbleSort = (array) => {
  ...
}
```

If we get all the way through the array without swapping any values, that means our array is sorted and our function can stop. To facilitate this, we create a boolean flag, `sorted`, that we default to false, then add a `while` loop that will continue to run as long as `sorted` is false:

```js
let sorted = false;

while (!sorted) {
  ...
}
```

Inside the `while` loop, we first update our `sorted` flag to true. That way, if we get through the entire array without swapping any values our while loop will not repeat and our program will end.

```js
sorted = true;
```

Next, we need to perform our comparison. First, we loop over the entire array:

```js
for (let i = 0; i < array.length; i++) {
  ...
}
```
If the current element is greater than the next element, we switch their positions. To do this, we assign the current element to a variable, `tmp`, replace  the current element with the next element, then replace then next element with our `tmp` variable. Also, we update our `sorted` boolean to false, since we did have to swap two values: 

```js
if (array[i] > array[i + 1]) {
  // since we're swapping and overwriting values, we need to temporarily store one of the values during the switch
  const tmp = array[i];

  // overwrite the value at `array[i]` with the value at `array[i + 1]`
  array[i] = array[i + 1];

  // overwrite the value at `array[i + 1]` with the value in `tmp`, which was the value originally at `array[i]`
  array[i + 1] = tmp;

  // since we found something to swap, we can assume the array isn't sorted still and we should run through the `while` loop again just in case
  sorted = false;
}
```

Since we are swapping the array values in place, we simply return the entire array at the end of the function:

```js
return array;
```

To test this function, we create an array of 2000 random numbers between 0 and 2000:

```js
// Create our input data
const unsortedInputArray = [];

// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}
```

Finally, we call the function with our `unsortedInputArray` and log the result:

```js
const sorted = bubbleSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');
```

Bringing it all together, our final solution looks like this: 

```js
const bubbleSort = (array) => {
  // set flag indicating the array hasn't been sorted yet
  let sorted = false;

  // as long as the array still isn't sorted, run this loop
  while (!sorted) {
    // automatically assume that the array is sorted by this point
    // if we find that there's still some sorting to do, we'll set this to `false` to continue the `while` loop
    sorted = true;

    // loop through the entire array
    for (let i = 0; i < array.length; i++) {
      // if the value at array[i] is greater than the value to the right of it in the array, swap those values
      if (array[i] > array[i + 1]) {
        // since we're swapping and overwriting values, we need to temporarily store one of the values during the switch
        const tmp = array[i];

        // overwrite the value at `array[i]` with the value at `array[i + 1]`
        array[i] = array[i + 1];

        // overwrite the value at `array[i + 1]` with the value in `tmp`, which was the value originally at `array[i]`
        array[i + 1] = tmp;

        // since we found something to swap, we can assume the array isn't sorted still and we should run through the `while` loop again just in case
        sorted = false;
      }
    }
  }
  // after the `while` loop has completed, we return the sorted array
  return array;
};

// Create our input data
const unsortedInputArray = [];

// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}

const sorted = bubbleSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');
```

Congratulations on creating your first sorting algorithm! Before we move on, let's calculate the time complexity of this algorithm. While it is likely that we will escape early when we get through the array without making a swap, in the worst case scenario we will have to run through the entire array once for every element in the array, so the Big O notation of this solution is O(n^2).

Bubble sort is a common sorting algorithm because it is straightforward to both understand and implement, but it is not a particularly efficient solution. Let's take a look at a few other sorting algorithms.

## Selection Sort

Imagine you are holding a series of numbered cards. One way you could sort them would be to search through the cards, find the smallest number, and place that into the first position.  Then, from the remaining set, repeat these steps to find the next smallest card, and so on. Conceptually, this is known as a **selection sort**, wherein the smallest element is selected, then the next smallest, until the array is sorted. 

## Insertion Sort

Alternatively, to sort the cards, you could assume the first card is in the correct position, then take the next card and place it before the first card if it is smaller or after the first card if it is larger.  Then, take the next card and compare against each sorted card until you find the correct location. Repeat this process for each card, and the whole set is sorted.  We call this an **insertion sort**, where we assume the first item is in the correct position, then insert each subsequent item into the correct slot. 

## Merge Sort

While the previous algorithms are all common ways for a human mind to sort a set of items, computers work differently than human brains. The next two sorting algorithms are not particularly intuitive, but both of these sorting algorithms are highly efficient and take advantage of how computers operate.  

A **merge sort** uses a "divide and conquer" strategy. First, the algorithm recursively divides the array into the smallest possible sections, called **partitions**, then each partition is sorted. Once the small partitions are sorted, they are compared to each other. Since the partitions are already sorted, only the first elements of each need to be compared, as we can assume those are already in the correct position. This process is repeated until the array is sorted. 

Let's take a look at a JavaScript implementation of merge sort. In this example we will create two functions, one to compare and merge two arrays, and another to recursively partition our array and then call the merging function. 

First, we will create our `mergeArrays` function. This function takes in two sorted arrays:

```js
const mergeArrays = (leftArray, rightArray) => {
  ...
}
```
This function is going to return a single merged array, so we create a variable to hold it called `resultArray`. Additionally, we need to track which index we are currently comparing in each array, so we set up two variables to do so:

```js
// create new array that our sorted array values from `left` and `right` will go into
const resultArray = [];

// keep track of what index we're at in each array for the following loop
let leftIndex = 0;
let rightIndex = 0;
```

Since we can assume these arrays are already sorted, we only have to compare the first element of each array to create our new sorted array. Since we are moving through them at different rates, we use a `while` loop to check that we have not yet reached the end of either array:

```js
while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
  ...
}
```

Within the loop, we determine which array has the lower value, add said value to our results array, then increment that array's index value:

```js
// if the value of the `leftArray` at its current index is less than the value of the `rightArray` at its current index, that means the `leftArray` value should be pushed into the `resultArray`
if (leftArray[leftIndex] < rightArray[rightIndex]) {
  resultArray.push(leftArray[leftIndex]);
  // Now that we've sorted the `leftArray` at that index, let's move onto the next one
  leftIndex++;
} else {
  // if the `rightArray`'s value is less than the `leftArray`'s value, push that value into `resultArray` instead and move onto the next index of the `rightArray`
  resultArray.push(rightArray[rightIndex]);
  rightIndex++;
}
```

The loop will exit when one of our two input arrays is empty. To ensure we get all the values to our new array, we combine our `resultArray` with whatever values have not yet been added from both input arrays:

```js
return resultArray
  .concat(leftArray.slice(leftIndex))
  .concat(rightArray.slice(rightIndex));
```

Now let's move on to our `mergeSort` function, which will recursively partition the array then call our `mergeArrays` function to merge those partitions together.  

First, we create our function, `mergeSort`, which accepts a single unsorted array as it's only parameter. This function is going to be called recursively to partition the array, so we need an escape condition. Here, if our array only have one item, it cannot get any smaller, so we can return the array of one element:

```js
const mergeSort = (array) => {
  // if input array is empty, it doesn't need to be sorted, so return it
  // this must be in place, or the recursive function calls will never end
  if (array.length <= 1) {
    return array;
  }
  ...
}
```

If our array has more than one element, we need to divide it in half. First, we determine the midpoint in our array and set it to the variable `middle`. Next, take a slice of the array from the beginning to the middle and store it as a variable called `left`. We then take a second slice of the array, from the middle to the end, and store in in a variable called `right`:

```js
// get index of the middle point of the array so we can split it in half
const middle = Math.floor(array.length / 2);

// split the array in half so we can compare values of smaller arrays and merge them together sorted later
const left = array.slice(0, middle);
const right = array.slice(middle);
```

Finally, we use recursion to further split these arrays and merge the result:

```js
return mergeArrays(mergeSort(left), mergeSort(right));
```

Remember, when function calls are nested within other function calls, the inner call will be resolved first. We will dive deeper on this topic on our next lesson when we discuss the specifics of how JavaScript executes functions. In this case, that means the recursive function will continue to break the array into smaller and smaller pieces until each partition contains only a single element, then merge those single element partitions into partitions of two elements, then four elements, etc, until the array is fully sorted.

To test this solution, we create a random array of 2000 numbers between 0 and 2000, pass said array into our `mergeSort` function, and log the result:

```js
// Create our input data
const unsortedInputArray = [];

// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}

const sorted = mergeSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');
```

Brining it all together, our final solution looks like this: 

```js
const mergeArrays = (leftArray, rightArray) => {
  // create new array that our sorted array values from `left` and `right` will go into
  const resultArray = [];

  // keep track of what index we're at in each array for the following loop
  let leftIndex = 0;
  let rightIndex = 0;

  // as long as there is at least one value left in both arrays, we'll loop
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    // if the value of the `leftArray` at its current index is less than the value of the `rightArray` at its current index, that means the `leftArray` value should be pushed into the `resultArray`
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      resultArray.push(leftArray[leftIndex]);
      // Now that we've sorted the `leftArray` at that index, let's move onto the next one
      leftIndex++;
    } else {
      // if the `rightArray`'s value is less than the `leftArray`'s value, push that value into `resultArray` instead and move onto the next index of the `rightArray`
      resultArray.push(rightArray[rightIndex]);
      rightIndex++;
    }
  }

  // the `resultArray` may not be sorted just yet, but it's closer to being sorted so the `mergeSort()` function can split it and sort it again
  // since the `while` loop may not have gotten to every index of the `leftArray` or `rightArray` arrays, we concatenate the leftover values back into `resultArray`
  return resultArray
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
};

const mergeSort = (array) => {
  // if input array is empty, it doesn't need to be sorted, so return it
  // this must be in place, or the recursive function calls will never end
  if (array.length <= 1) {
    return array;
  }

  // get index of the middle point of the array so we can split it in half
  const middle = Math.floor(array.length / 2);

  // split the array in half so we can compare values of smaller arrays and merge them together sorted later
  const left = array.slice(0, middle);
  const right = array.slice(middle);

  // use recursion to continuously split `left` and `right` arrays in half and sort with `mergeArrays()` until there's nothing left to sort and return the finished/sorted array
  return mergeArrays(mergeSort(left), mergeSort(right));
};

// Create our input data
const unsortedInputArray = [];

// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}

const sorted = mergeSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');

```

While it may not appear so, this "divide and conquer" strategy actually greatly improves the efficiency of our algorithm. Remember, the most intuitive solutions are not always the most efficient!

## Quick Sort

Finally, let's talk about **quick sort**. In a quick sort algorithm, an element is selected, called a **pivot**, then every other element is compared to that pivot. Anything less than the pivot is moved to the start side of the array, and a pointer is kept to reference the last element less than the pivot. Once the entire array has been iterated, the pivot is inserted after all the elements that had been moved. The end result after the first iteration is that the initial pivot is in exactly the correct position, all values to the left of the pivot are less than the pivot, and all values to the right of the pivot are greater than the pivot.

Next, a new pivot point is selected from the remaining unsorted values. The same process is repeated, but now that our array is partially sorted, we only have to compare the chosen pivot to a smaller section of the array.

Imagine you are provided the array `[5,2,3,7,1,9]`. If we were to run this through a quick sort algorithm, our first step would be to select a pivot. There are many schools of thought, doctoral theses, and white papers on how to select your pivot, but for our purposes, we will simply use the first element, `5`. 

Once our pivot is selected, we need to remove it from the unsorted list to ensure we don't accidentally check it against itself. We are going to swap it with the last element, because it is less computationally demanding to swap two elements in an array than to change the size of an array by removing an element. At this point, our array looks like this: `[9,2,3,7,1,5]

We need to keep track of the last index that was less than our pivot so we know where to insert our pivot at the end. For now, nothing has been swapped, so our last swapped index should default to -1.

Now, we compare each element with the pivot, switching the elements less than the pivot with the first unswapped item. Step by step, it would look like this:

1. `9` is greater than `5`, so no items are swapped. The array is currently `[9,2,3,7,1,5]` and our last swapped index is `-1`.

2. `2` is less than `5`, so we need to swap `2` into the first unswapped position. Since our last swapped index is `-1`, our first unswapped position would be the next item in the array, in this case, index `0`. So we switch the `2` into index `0`, and update our last swapped index to `0`.  The array is currently `[2,9,3,7,1,5]` and our last swapped index is `0`.

3. `3` is less than `5`, so again we need to swap it into our first unswapped position and increment our last swapped index. The array is currently `[2,3,9,7,1,5]` and the last swapped index is `1`.

4. `7` is greater than `5`, so no items are swapped. The array is currently `[2,3,9,7,1,5]` and the last swapped index is `1`.

5. `1` is less than `5`, so it needs to be swapped with the first unswapped item. The array is currently `[2,3,1,7,9,5]` and the last swapped index is `2`.

6. Now that we have gotten to our pivot, we need to swap it into the correct position. Our last swapped index is `2`, so we know all elements from 0 to 2 are less than our pivot, and all other elements are greater than our pivot. We swap our pivot with the item at index `3`. The array is currently `[2,3,1,5,9,7]` and the last swapped index is `2`.

7. Our first iteration is complete, and not only is our pivot in the exact correct position, all items left of it are less than it and all items to the right of it are greater than it. The array is partially sorted.

8. When we select our next pivot, in this case `2`, we only need to perform the comparison up to our first sorted value, which in this case is 5. We again swap our pivot the end of the section we need to compare, in this case, up to index `2`. We also reset our last swapped index tracker to `-1`. The array is currently `[1,3,2,5,9,7]` and the last swapped index is `-1`.

9. `1` is less than `2`, so it needs to be swapped into the first unswapped position and our last swapped index needs to be updated. Since `1` is already in the first unswapped position, we don't actually need to swap any elements. The array is currently `[1,3,2,5,9,7]` and the last swapped index is `0`.

9. `3` is greater than `2`, so no items are swapped. The array is currently `[1,3,2,5,9,7]` and the last swapped index is `0`.

10. We have reached our pivot, so we need to swap it with our first unswapped item. Since our last swapped index is `0`, we swap our pivot into position 1. The array is currently `[1,2,3,5,9,7]` and the last swapped index is `0`.

11. At this point, we know both of our pivots, `2` and `5` are in the correct positions. Additionally, since the unsorted sections between the beginning of the array and the `2`, and between the `2` and `5` both only contain one item, we can assume those sections are also sorted. That means we now know all elements through the `5` are in the correct position. We only have to sort the items greater than `5`.

12. Looking at our remaining section, our first value is `9`, so that will become our new pivot. We swap that element to the end of the unsorted section and set our last swapped index to `3`, as we are only concerned with elements starting at index `4`.  The array is currently `[1,2,3,5,7,9]` and the last swapped index is `3`.

13. `7` is less than `9`, so it needs to be swapped into the first unswapped position and our last swapped index needs to be updated. Since `7` is already in the first unswapped position, we don't actually need to swap any elements. The array is currently `[1,2.3,5,7,9]` and the last swapped index is `4`.

14. We have reached our pivot, so we need to swap it into our first unswapped position, index `5`. It's already in index 5, so we don't actually do a swap. Additionally, since the unsorted section between the `5` and `9` only includes a single item, we can assume that item is also in the correct position. Our array is fully sorted!

Much like merge sort, quick sort may not seem intuitive at first glance. In fact, it may seem totally convoluted and overly complex. However quick sort is one of the most efficient sorting algorithms. Its is called quick sort because it is, in fact, very quick.

## Reflection

Sorting is a very common problem in computer science, and several algorithmic solutions exist. When deciding which solution to implement, remember to think about the trade offs. How important is efficiency vs ease of understanding? How big will the dataset be? There is never one single "correct" solution, so be mindful of the tradeoffs when coding.

In this lesson, you learned the following:

* How to define insertion, selection, merge, and quick sort algorithms.

* How to implement a bubble sort algorithm.

* How to implement a merge sort algorithm. 

Sorting algorithms form the bedrock of any computer science education, so congratulations on making it this far! You are well on the way to a firm understanding of computer science fundamentals. 

Broadly, computer science can be broken down into two major topics: Algorithms, like the searching sorting algorithms we have already covered, and data structures, like arrays and objects, which we will cover next. 

---

© 2025 edX Boot Camps LLC. Confidential and Proprietary. All Rights Reserved.
