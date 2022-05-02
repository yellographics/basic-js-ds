const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor (){
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    const newNode = new Node(data);

    if(this.base === null){
      this.base = newNode;
    } else {
      this.addNewNode(this.base, newNode);
    }
  }

  addNewNode(node, newNode){
    if(newNode.data < node.data){
      if(node.left === null){
        node.left = newNode;
      } else this.addNewNode(node.left, newNode);
    } else {
      if(node.right === null){
        node.right = newNode;
      } else this.addNewNode(node.right, newNode);
    }
  }

  has(data) {
    
    function searchInside(node, data){
      if(!node){
        return false;
      }

      if(node.data === data){
        return true;
      }

      if(node.data > data){
        return searchInside(node.left, data);
      } else {
        return searchInside(node.right, data);
      }
    }

    return searchInside(this.base, data);
  }

  find(data) {
    function findInside(node, data){
      if(!node){
        return false;
      }

      if(node.data === data){
        return node;
      }

      if(node.data > data){
        return findInside(node.left, data) || null;
      } else {
        return findInside(node.right, data) || null;
      }
    }

    return findInside(this.base, data);
  }

  remove(data) {
    
    this.base = removeNode(this.base, data);

    function removeNode(node, data) {
      //если узла нет, возвращаем null
      if (!node) {
        return null;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = removeNode(node.right, data);
        return node;
      } else {
        // если значение узла равно тому что мы ищем и у этого узла нет потомков, заменяем узел на null
        if (!node.left && !node.right) {          
          return null;
        }

        if (!node.left) {
          // если у узла нет левого потомка, то заменяем узел на правого потомка
          node = node.right;
          return node;
        }

        if (!node.right) {
          // если у узла нет правого потомка, то заменяем узел на левого потомка
          node = node.left;
          return node;
        }

        // если существут оба потомка, то ищем либо минимального потомка справа, либо максимального потомка слева и заменяем им узел
        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;

        node.right = removeNode(node.right, minFromRight.data);

        return node;
      }
    }
  }

  min() {
    if(!this.base){
      return;
    }

    let node = this.base;
    while(node.left){
      node = node.left;
    }

    return node.data;
  }

  max() {
    if(!this.base){
      return;
    }

    let node = this.base;
    while(node.right){
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};