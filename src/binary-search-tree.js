const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootValue = null
  }

  root() {
    return this.rootValue
  }

  add(data) {
    this.rootValue = addInRoot(this.rootValue, data);

    function addInRoot(node, data) {
      if(!node) {
        return new Node(data)
      }

      if(node.data === data ){
        return node
      }

      if(data < node.data) {
        node.left = addInRoot(node.left, data)
      } else {
        node.right = addInRoot(node.right, data)
      }
      return node
    }
  }

  has(data) {
    return hasData(this.rootValue, data);

    function hasData(node, data) {
      if (!node) return false;

      if (node.data === data) return true

      return data < node.data
        ? hasData(node.left, data)
        : hasData(node.right, data);
    }
  }

  find( data ) {
    return findData(this.rootValue, data)

    function findData (node, data) {
      if (!node) return null

      if (node.data === data) return node

      return data < node.data
        ? findData(node.left, data)
        : findData(node.right, data);
    }
  }

  remove( data ) {
    this.rootValue = removeFromRoot(this.rootValue, data);

    function removeFromRoot (node, data) {
      if (!node) return

      if (data < node.data) {
        node.left = removeFromRoot(node.left, data);
        return node
      } else if (data > node.data) {
        node.right = removeFromRoot(node.right, data);
        return node
      } else {
        if (!node.right && !node.left) return

        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let minFromRight = node.right
        while(minFromRight.left) {
          minFromRight= minFromRight.left
        }
        node.data = minFromRight.data
        node.right = removeFromRoot( node.right, minFromRight.data)
        return node
      }
    }
  }

  min() {
    if (!this.rootValue) return null

    let node = this.rootValue
    while (node.left) {
      node = node.left
    }
    return node.data
  }

  max() {
    if (!this.rootValue) return null

    let node = this.rootValue
    while(node.right) {
      node = node.right
    }
    return node.data
  }
}

module.exports = {
  BinarySearchTree
};