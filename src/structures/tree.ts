export class TreeNode {
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

export class BinaryTree {
    static buildTreeFromArray(arr: (number | null)[]) {
        if (arr.length === 1) {
            return new BinaryTree(arr[0], null, null);
        }

        let root = new BinaryTree(arr[0], null, null);
        let i = 1;

        let current = root;
        const queue = [];

        let j = 0;

        while (i < arr.length) {
            if (j < 2) {
                const type = j === 0 ? 'left' : 'right';

                if (arr[i] !== null) {
                    let newChild = new BinaryTree(arr[i], null, null);
                    current[type] = newChild;
                    queue.unshift(newChild);
                } else {
                    current[type] = null;
                }

                j++;
                i++;
            } else {
                current = queue.pop();
                j = 0;
            }
        }

        return root;
    }

    constructor(public val: number, public left: BinaryTree, public right: BinaryTree) { }
}