//The counter function returns a closure that still has access to the count variable.

function counter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

//We set the returned function to a variable called increment, then call it three times. Since the returned function has access to the original function's scope, we can see our count variable being updated.

const increment = counter();
increment(); // => logs 1
increment(); // => logs 2
increment(); // => logs 3

//However, if we try to access the `count` variable outside of the function, the code throws an error, since the variable does not exist in global scope:
// console.log(count); //=> throws error

//Additionally, each time we call counter creates a separate context, so we can reuse the counter function to create multiple increments:

const secondInc = counter();
secondInc(); //logs 1
