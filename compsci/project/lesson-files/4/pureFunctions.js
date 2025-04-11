//This is a pure function, since it will always return the same result when provided the same input:

function pureSum(num1, num2) {
  return num1 + num2;
}

//Since it updates a variable in global scope (a side effect), this is not a pure function.
let sum = 0;
function impureSum(num1, num2) {
  sum = num1 + num2;
}

//This is also not a pure function, since its output is not consistent with consistent inputs.
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
