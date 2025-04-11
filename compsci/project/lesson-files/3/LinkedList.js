class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(val) {
    this.head = new Node(val);
  }
  add(val) {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = new Node(val);
  }
  printPretty() {
    let result = `${this.head.val}`;
    let currentNode = this.head.next;
    while (currentNode) {
      result += ' -> ';
      result += currentNode.val;
      currentNode = currentNode.next;
    }
    console.log(result);
  }
}

const myList = new LinkedList(3);
myList.add(-1);
myList.add(2);
myList.printPretty(); //=> 3 -> -1 -> 2
