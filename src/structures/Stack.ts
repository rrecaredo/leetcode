class StackNode<T> {
    constructor(public data: T, public link: StackNode<T> | null) { }
}

// Create Stack Using Linked list
export class Stack<T> {
    private length = 0;

    constructor(private top: StackNode<T> | null = null) { }

    public get size(): number {
        return this.length;
    }

    push(value: T) {
        let node = new StackNode(value, this.top);
        this.top = node;
        this.length++;
    }

    isEmpty() {
        return this.top == null;
    }

    peek() {
        return this.isEmpty() ? null : this.top.data;
    }

    pop() {
        const node = this.top;
        this.top = node.link;
        this.length--;
        return node.data;
    }
}

