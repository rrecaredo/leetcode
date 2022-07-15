class StackNode<T> {
    constructor(public data: T, public next: StackNode<T> | null) { }
}

// Create Stack Using Linked list
export class Stack<T> {
    private length = 0;

    constructor(private head: StackNode<T> | null = null) { }

    public get size(): number {
        return this.length;
    }

    push(value: T) {
        let node = new StackNode(value, this.head);
        this.head = node;
        this.length++;
    }

    isEmpty() {
        return this.head == null;
    }

    peek() {
        return this.isEmpty() ? null : this.head.data;
    }

    pop() {
        const node = this.head;
        this.head = node.next;
        this.length--;
        return node.data;
    }
}

