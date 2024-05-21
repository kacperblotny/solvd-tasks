class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}
class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    // create a node with given value
    const newNode = new Node(value)

    // if tree is empty the node becomes new root
    if (this.root === null) {
      this.root = newNode
      return
    }

    // if not, call a helper method to insert the new node in a correct place
    this._insertNode(this.root, newNode)
  }

  _insertNode(node, newNode) {
    // recursively, if inserting node is smaller then one being checked
    if (newNode.value < node.value) {
      // and left node empty, insert
      if (node.left === null) {
        node.left = newNode
      } else {
        // if not, keep looking
        this._insertNode(node.left, newNode)
      }
    } else {
      // if inserting node is bigger then one being checked
      if (node.right === null) {
        // and right node empty, insert
        node.right = newNode
      } else {
        // if not, keep looking
        this._insertNode(node.right, newNode)
      }
    }
  }

  // search using helper method
  search(value) {
    return this._searchNode(this.root, value)
  }

  _searchNode(node, value) {
    // if node is null, return null
    if (node === null) return null
    //  value smaller than node, so look on the left sub-tree
    if (value < node.value) return this._searchNode(node.left, value)
    //  value larger than node, so look on the right sub-tree
    if (value > node.value) return this._searchNode(node.right, value)
    // if every fail just return node
    return node
  }

  // call a helper method to perform the traversal starting from the root
  inOrderTraverse(callback) {
    this._inOrderTraverseNode(this.root, callback)
  }

  // helper method to recursively perform the in-order traversal
  _inOrderTraverseNode(node, callback) {
    // if the current node is not null
    if (node !== null) {
      // recursively traverse the left subtree
      this._inOrderTraverseNode(node.left, callback)
      // visit the current node by calling the callback function
      callback(node.value)
      // recursively traverse the right subtree
      this._inOrderTraverseNode(node.right, callback)
    }
  }

  // call a helper method to perform the traversal starting from the root
  preOrderTraverse(callback) {
    this._preOrderTraverseNode(this.root, callback)
  }

  // helper method to recursively perform the pre-order traversal
  _preOrderTraverseNode(node, callback) {
    // if the current node is not null
    if (node !== null) {
      // visit the current node by calling the callback function
      callback(node.value)
      // recursively traverse the left subtree
      this._preOrderTraverseNode(node.left, callback)
      // recursively traverse the right subtree
      this._preOrderTraverseNode(node.right, callback)
    }
  }

  // helper method to perform the traversal starting from the root
  postOrderTraverse(callback) {
    this._postOrderTraverseNode(this.root, callback)
  }
  // helper method to recursively perform the post-order traversal
  _postOrderTraverseNode(node, callback) {
    // if the current node is not null
    if (node !== null) {
      // recursively traverse the left subtree
      this._postOrderTraverseNode(node.left, callback)
      // recursively traverse the right subtree
      this._postOrderTraverseNode(node.right, callback)
      // visit the current node by calling the callback function
      callback(node.value)
    }
  }

  // method to check if the binary tree is a BST
  isBST() {
    return this._isBSTHelper(this.root, -Infinity, Infinity)
  }
  // helper method to check if the tree is a BST
  _isBSTHelper(node, min, max) {
    // if the node is null, return true (an empty tree is a BST)
    if (node === null) {
      return true
    }
    // if the node's value is not within the valid range, return false
    if (node.value <= min || node.value >= max) {
      return false
    }
    // recursively check the left and right subtrees with updated ranges
    return (
      this._isBSTHelper(node.left, min, node.value) &&
      this._isBSTHelper(node.right, node.value, max)
    )
  }
}

// example usage
const tree = new BinaryTree()
tree.insert(10)
tree.insert(5)
tree.insert(20)
tree.insert(3)
tree.insert(7)
tree.insert(15)
tree.insert(25)

console.log(tree.isBST())
