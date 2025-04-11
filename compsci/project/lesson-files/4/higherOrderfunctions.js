//Higher order function that returns other functions
function makeSum(val) {
  return function returnFunc(num) {
    console.log(val + num);
  };
}

//Since we passed 5 as the argument, this function will add 5 to the provided value.
const add5 = makeSum(5);
add5(8); //=>13
add5(3); //=>8
add5(-1); //=>4

//We can reuse our higher order function, this time adding 13 to the provided value.
const add13 = makeSum(13);
add13(9); //=>22
add13(1); //=>14
add13(12); //=>25
