class QueueNode<T> {
    constructor(public data: T, public next: QueueNode<T> | null) { }
}

// Create Stack Using Linked list
export class Queue<T> {
    private length = 0;
    private tail: QueueNode<T> | null;

    constructor(private head: QueueNode<T> | null = null) {
        this.tail = this.head;
    }

    public get size(): number {
        return this.length;
    }

    enqueue(value: T) {
        let node = new QueueNode(value, null);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
        this.length++;
    }

    isEmpty() {
        return this.head == null;
    }

    peek() {
        return this.isEmpty() ? null : this.tail.data;
    }

    dequeue() {
        if (this.head == null) {
            return null;
        }

        const node = this.head;
        this.head = node.next;
        this.length--;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return node.data;
    }
}

