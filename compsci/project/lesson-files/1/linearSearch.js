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
