import { expect } from 'earljs';

/*
Given the root of an n-ary tree, return the preorder traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal.
Each group of children is separated by the null value (See examples)

Example 1:
Input: root = [1,null,3,2,4,null,5,6]
Output: [1,3,5,6,2,4]

Example 2:
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,2,3,6,7,11,14,4,8,12,5,9,13,10]

Constraints:

The number of nodes in the tree is in the range [0, 104].
0 <= Node.val <= 104
The height of the n-ary tree is less than or equal to 1000.
*/

class TreeNode {
    static buildTreeFromArray(arr: (number | null)[]) {
        if (arr.length === 1) {
            return new TreeNode(arr[0], []);
        }

        let root = new TreeNode(arr[0], []);
        let i = 1;

        if (arr[i] !== null) {
            return root;
        }

        i++;

        let current = root;
        const queue = [];

        while (i < arr.length) {
            if (arr[i] !== null) {
                let newChild = new TreeNode(arr[i], []);
                current.children.push(newChild);
                queue.unshift(newChild);
            } else {
                current = queue.pop();
            }

            i++;
        }

        return root;

    }
    constructor(public val: number, public children: TreeNode[]) { }
};

/*
My approach was to use an iterative solution. Overall, I try to not use recursion in
JavaScript as most runtimes are not optimized for recursion and there is always the
risk of hitting stack overflow.

Hence, I used a stack to store the order in which future nodes need to be visited and
appended to the final result.
First I add the root node to the stack and then, for each iteration I take the first
element of the stack (duh, it is a stack), append it to the result and then add its
children to the stack (in reverse order).

Time complexity: O(n)
Space complexity: O(n)
*/
function preorder(root: TreeNode) {
    if (root == null) return [];

    const result = [];
    const stack = [root];

    while (stack.length) {
        let current = stack.shift();
        result.push(current.val);

        for (let i = current.children.length - 1; i >= 0; i--) {
            stack.unshift(current.children[i]);
        }
    }

    return result;
}

/*
Recursive variant is much shorter. It can be done in two ways.
1) Using a closure function and a scoped list under preorderRecursive
2) Passing the list as a reference to each recursive call.

It follows basic Depth first traversal algorithm with preorder sequence.

Time complexity: O(n)
Space complexity: O(n)
*/
function preorderRecursive(root: TreeNode, list: number[] = []) {
    if (root == null) return list;

    list.push(root.val);

    for (let child of root.children) {
        preorderRecursive(child, list);
    }
    return list;
}

const tree1 = TreeNode.buildTreeFromArray([1, null, 3, 2, 4, null, 5, 6]);
const expected1 = [1, 3, 5, 6, 2, 4];

const tree2 = TreeNode.buildTreeFromArray([1, null, 3, 2, 4, null, 5, 6]);
const expected2 = [1, 3, 5, 6, 2, 4];

expect(preorder(tree1)).toEqual(expected1);
expect(preorder(tree2)).toEqual(expected2);

expect(preorderRecursive(tree1)).toEqual(expected1);
expect(preorderRecursive(tree2)).toEqual(expected2);