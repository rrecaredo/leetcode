import { expect } from 'earljs';
import { Stack } from './../structures/Stack';
import { BinaryTree, TreeNode } from './../structures/tree';
/*
Given the root of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Example 1:

Input: root = [2,1,3]
Output: true

Example 2:

Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraints:

The number of nodes in the tree is in the range [1, 104].
-231 <= Node.val <= 231 - 1
*/

function isValidBST(root: BinaryTree, max = Number.POSITIVE_INFINITY, min = Number.NEGATIVE_INFINITY) {
    if (root === null) return true;

    if (root.val <= min || root.val >= max) return false;

    return isValidBST(root.left, root.val, min) && isValidBST(root.right, max, root.val);
}

function isValidBSTIterative(root: BinaryTree) {
    if (root === null) return true;

    const stack = [{ current: root, max: Number.POSITIVE_INFINITY, min: Number.NEGATIVE_INFINITY }];

    while (stack.length) {
        const { current, max, min } = stack.shift();

        if (current === null) continue;
        if (current.val <= min || current.val >= max) return false;

        stack.unshift({ current: current.left, max: current.val, min });
        stack.unshift({ current: current.right, max, min: current.val });
    }
}

expect(isValidBST(BinaryTree.buildTreeFromArray([5, 1, 4, null, null, 3, 6]))).toBeFalsy()
expect(isValidBST(BinaryTree.buildTreeFromArray([2, 2, 2]))).toBeFalsy();
expect(isValidBST(BinaryTree.buildTreeFromArray([5, 4, 6, null, null, 3, 7]))).toBeFalsy();

expect(isValidBSTIterative(BinaryTree.buildTreeFromArray([5, 1, 4, null, null, 3, 6]))).toBeFalsy()
expect(isValidBSTIterative(BinaryTree.buildTreeFromArray([2, 2, 2]))).toBeFalsy();
expect(isValidBSTIterative(BinaryTree.buildTreeFromArray([5, 4, 6, null, null, 3, 7]))).toBeFalsy();
