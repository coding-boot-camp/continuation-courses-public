class Stack {
  // default value allows stack to initialize without an argument
  constructor(container = []) {
    this.container = container;
  }

  // adds an element to the top of the stack
  addToStack(el) {
    return this.container.push(el);
  }

  // removes an element from the top of the stack
  removeFromStack() {
    return this.container.pop();
  }
}

const numStack = new Stack();
numStack.addToStack(2);
numStack.addToStack(4);
numStack.addToStack(6);
console.log(numStack); //=> { container: [2,4,6] }
numStack.removeFromStack();
console.log(numStack); //=>{ container: [2,4] }
