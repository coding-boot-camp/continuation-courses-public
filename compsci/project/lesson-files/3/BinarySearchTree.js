class Node {
  constructor(val) {
    this.left = null;
    this.right = null;
    this.val = val;
  }
}

class Tree {
  constructor(val) {
    this.root = new Node(val);
  }
  insertNode(val) {
    const insert = (node, val) => {
      if (val < node.val) {
        //go left
        if (!node.left) {
          const newNode = new Node(val);
          node.left = newNode;
        } else {
          insert(node.left, val);
        }
      } else if (val > node.val) {
        //go right
        if (!node.right) {
          const newNode = new Node(val);
          node.right = newNode;
        } else {
          insert(node.right, val);
        }
      }
    };
    insert(this.root, val);
  }
  searchVal(val) {
    const search = (node, val) => {
      if (!node) {
        return null;
      }
      if (val === node.val) {
        return node;
      } else if (val < node.val) {
        return search(node.left, val);
      } else {
        return search(node.right, val);
      }
    };
    return search(this.root, val);
  }
}

const myBst = new Tree(10);

myBst.insertNode(6);
myBst.insertNode(13);
myBst.insertNode(3);
myBst.insertNode(9);
myBst.insertNode(11);
myBst.insertNode(16);
myBst.insertNode(7);

console.log(myBst.searchVal(10));
console.log(myBst.searchVal(7));
console.log(myBst.searchVal(13));
console.log(myBst.searchVal(-1));
