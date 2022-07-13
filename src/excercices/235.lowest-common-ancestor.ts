import { expect } from 'earljs';
import { BinaryTree } from './../structures/tree';

/*
Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given
nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
between two nodes p and q as the lowest node in T that has both p and q as descendants
(where we allow a node to be a descendant of itself).”

Example 1:

Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.
Example 2:


Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [2,1], p = 2, q = 1
Output: 2

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the BST.
*/

/*
Time complexity: O(h) where h represents the height of the tree
Space complexity: O(1)
*/
function lowestCommonAncestor(root: BinaryTree, p: BinaryTree, q: BinaryTree) {
    let min = Math.min(p.val, q.val);
    let max = Math.max(p.val, q.val);

    let el = root;

    while (el.val < min || el.val > max) {
        if (el.val > max) {
            el = el.left;
        } else if (el.val < min) {
            el = el.right;
        }
    }

    return el.val;
};

/*
Time complexity: O(h)
Space complexity: O(n)
*/
function lowestCommonAncestorRecursive(root: BinaryTree, p: BinaryTree, q: BinaryTree) {
    let min = Math.min(p.val, q.val);
    let max = Math.max(p.val, q.val);

    return lca(root, min, max);
};

function lca(root: BinaryTree, min: number, max: number) {
    if (root.val >= min && root.val <= max) {
        return root;
    }

    if (root.val > max) {
        return lca(root.left, min, max);
    } else if (root.val < min) {
        return lca(root.right, min, max);
    }
}

let p1 = new BinaryTree(2, null, null);
let q1 = new BinaryTree(8, null, null);
let q2 = new BinaryTree(4, null, null);

expect(
    lowestCommonAncestor(
        BinaryTree.buildTreeFromArray([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]),
        p1,
        q1)
).toEqual(6);

expect(
    lowestCommonAncestor(
        BinaryTree.buildTreeFromArray([6, 2, 8, 0, 4, 7, 9, null, null, 3, 5]),
        p1,
        q2)
).toEqual(2);
