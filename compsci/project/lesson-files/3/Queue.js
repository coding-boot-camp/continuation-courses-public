class Queue {
  // default value allows queue to instantiate without an argument
  constructor(container = []) {
    this.container = container;
  }

  // adds an element to the back of the queue
  addToQueue(el) {
    return this.container.push(el);
  }

  // removes an element from the front of the queue
  removeFromQueue() {
    return this.container.shift();
  }
}

const numQueue = new Queue();
numQueue.addToQueue(1);
numQueue.addToQueue(14);
numQueue.addToQueue(2);
console.log(numQueue); //=> { container: [1,14,2]}
numQueue.removeFromQueue();
console.log(numQueue); //=> { container: [14,2]}
