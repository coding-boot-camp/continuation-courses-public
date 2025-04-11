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
