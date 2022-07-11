import { expect } from 'earljs';
import { BinaryTree } from '../structures/tree';

/*
Given the root of a binary tree, return the level order traversal of its nodes' values.
(i.e., from left to right, level by level).

Example1:

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Example 2:

Input: root = [1]
Output: [[1]]
Example 3:

Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000
*/

/*
I first went with a recursive approach on this one. For practicing mostly.
I don't like the fact that we are mutating the array we receive by reference
on each recursive call. I wouldn't write code like this for production and
I think it is a terrible practice which leads to bugs and memory leaks.

Anyway, the idea is to use 2 extra variables that we pass along on each call
- list: the final list that we build progressively.
- level: which level in the tree the current node we are inspecting is in.

With these two, we use a preorder algorithm, in which we append the current
node's value to the subarray corresponding its current level (by index) and
recursively invoke the function itselve for each of its children (left and right).

Time complexity: O(n)
Space complexity: O(n)
*/
function levelOrder(root: BinaryTree) {
    if (root === null) return [];
    return _levelOrder(root, [[root.val]]);
}

function _levelOrder(root: BinaryTree, list: number[][] = [], level = 1) {
    if (root === null) return;

    if (root.left || root.right) {
        if (list[level] === undefined)
            list[level] = [];

        if (root.left) list[level].push(root.left.val);
        if (root.right) list[level].push(root.right.val);

        _levelOrder(root.left, list, level + 1);
        _levelOrder(root.right, list, level + 1);
    }

    return list;
}

/*
I like the iterative version much better.
It does noe even require an extra level variable. Instead, it uses a queue
for storing the nodes we want to visit next. Because of this, we are always
sure that during each iteration, we unqueue all elements from a level and,
and enqueue all their children for the next iteration.

Time complexity: O(n)
Space complexity: O(h)
*/
function levelOrderIterative(root: BinaryTree) {
    if (!root) {
        return [];
    }
    const queue = [];
    queue.push(root);
    const result = [];

    while (queue.length > 0) {
        const size = queue.length;
        const temp = [];
        for (let i = 0; i < size; i++) {
            const node = queue.shift();
            temp.push(node.val);
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
        result.push(temp);
    }
    return result;
};

const tree1 = BinaryTree.buildTreeFromArray([3, 9, 20, null, null, 15, 7]);
const expect1 = [[3], [9, 20], [15, 7]];

const tree2 = BinaryTree.buildTreeFromArray([1, 2, 3, 4, null, null, 5]);
const expect2 = [[1], [2, 3], [4, 5]];

expect(levelOrder(tree1)).toEqual(expect1);
expect(levelOrder(tree2)).toEqual(expect2);
