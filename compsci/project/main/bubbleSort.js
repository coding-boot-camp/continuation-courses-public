// Create our input data
const unsortedInputArray = [];

// seed data in unsortedInputArray
for (let i = 0; i < 2000; i++) {
  unsortedInputArray.push(Math.round(Math.random() * 2000));
}

// slightly more efficient since it will stop the `while` loop early if array is sorted
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

const sorted = bubbleSort(unsortedInputArray);
console.log('Post Sort:', sorted.join(' '));
console.log('DONE!');
