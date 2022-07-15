export abstract class BinaryHeap {
    items: number[];

    constructor(items: number[] = []) {
        this.items = items;
    }

    insert(value: number) {
        this.items.push(value);
        this.heapifyUp(this.lastIndex);
    }

    pop() {
        this.swap(0, this.lastIndex);
        const value = this.items.pop();
        this.heapifyDown(0);

        return value;
    }

    protected heapifyUp(index: number) {
        let currentIndex = index;
        let parentIndex = this.parent(currentIndex);

        while (currentIndex > 0 && this.shouldSwap(this.items[currentIndex], this.items[parentIndex])) {
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
            parentIndex = this.parent(currentIndex);
        }
    }

    protected heapifyDown(index: number) {
        if (this.isLeaf(index)) return;

        const leftChild = this.leftChildIndex(index);
        const rightChild = this.rightChildIndex(index);

        for (let child of [leftChild, rightChild]) {
            if (this.shouldSwap(this.items[child], this.items[index])) {
                this.swap(child, index);
                this.heapifyDown(child);
                break;
            }
        };
    }

    protected get lastIndex() {
        return this.items.length - 1;
    }

    protected leftChildIndex(index: number) {
        return (index * 2) + 1;
    }

    protected rightChildIndex(index: number) {
        return (index * 2) + 2;
    }

    protected parent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    protected swap(index1: number, index2: number) {
        [this.items[index1], this.items[index2]] = [this.items[index2], this.items[index1]];
    }

    protected isLeaf(index: number) {
        return (
            index >= Math.floor(this.items.length / 2) && index <= this.items.length - 1
        )
    }

    protected abstract shouldSwap(value1: number, value2: number): boolean;
}

/*

      7
   2     3
  4 5   6

 2 = pos(1)
 3 = pos(2)
 4 = pos(3)

 [1, 2, 3, 4, 5]
  0  1  2  3  4



*/
