const log = console.log;

function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}

function BinaryTree() {
    this.parent = null;
}

// root – left child – right child
BinaryTree.prototype.preOrderTraversal = function* (node = this.parent) {
    if (node == null) {
        return;
    }

    yield node.value;
    yield* this.preOrderTraversal(node.left);
    yield* this.preOrderTraversal(node.right);
}

// left child – root – right child
BinaryTree.prototype.InOrderTraversal = function* (node = this.parent) {
    if (node == null) {
        return;
    }

    yield* this.InOrderTraversal(node.left);
    yield node.value;
    yield* this.InOrderTraversal(node.right);
}

// left child – right child – root
BinaryTree.prototype.postOrderTraversal = function* (node = this.parent) {
    if (node == null) {
        return;
    }

    yield* this.postOrderTraversal(node.left);
    yield* this.postOrderTraversal(node.right);
    yield node.value;
}

BinaryTree.prototype.height = function (node = this.parent) {
    if (node == null) {
        return 0;
    }

    let lDepth = this.height(node.left);
    let rDepth = this.height(node.right);

    if (lDepth > rDepth) {
        return (lDepth + 1);
    } else {
        return (rDepth + 1);
    }
}

// or BFS
// Time: O(N^2)
// Space: O(N)
BinaryTree.prototype.levelOrderTraversal = function () {
    const _printCurrentLevel = function (root, level) {
        if (root == null) {
            return;
        }

        if (level === 1) {
            log(root.value);
        } else if (level > 1) {
            _printCurrentLevel(root.left, level - 1);
            _printCurrentLevel(root.right, level - 1);
        }
    }

    let h = this.height();
    for (let i = 0; i <= h; i++) {
        _printCurrentLevel(this.parent, i);
    }
}

// or BFS using Queue
// Time: O(N)
// Space: O(N)
BinaryTree.prototype.levelOrderTraversalQ = function* () {
    const queue = [];
    queue.push(this.parent);

    while (queue.length !== 0) {
        let temp = queue.shift();
        yield temp.value;

        if (temp.left != null) {
            queue.push(temp.left);
        }

        if (temp.right != null) {
            queue.push(temp.right);
        }
    }
}

BinaryTree.prototype.insertInLevelOrder = function (element) {
    const node = new Node(element);
    if (this.parent == null) {
        this.parent = node;
        return;
    }
    const queue = [];
    queue.push(this.parent);

    while (queue.length !== 0) {
        let temp = queue.shift();

        if (temp.left != null) {
            queue.push(temp.left);
        } else {
            temp.left = node;
            return;
        }

        if (temp.right != null) {
            queue.push(temp.right);
        } else {
            temp.right = node;
            return;
        }
    }
}

/**
* Delete a node by making sure that the tree shrinks from the bottom. 
* The deleted node is replaced by the bottom-most and rightmost node.
*/
BinaryTree.prototype.deleteNode = function () {

}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
let node5 = new Node(5);
let node6 = new Node(6);
let node7 = new Node(7);

let bt = new BinaryTree();
bt.parent = node1;
node1.left = node2;
node1.right = node3;
node2.left = node4;
node2.right = node5;
node3.left = node6;
node3.right = node7;

let preGen = bt.preOrderTraversal();
let InGen = bt.InOrderTraversal();
let postGen = bt.postOrderTraversal();
let levelGen = bt.levelOrderTraversalQ();


log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());
log(levelGen.next());