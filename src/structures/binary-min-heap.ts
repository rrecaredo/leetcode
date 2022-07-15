import { BinaryHeap } from "./binary-heap";

export class BinaryMinHeap extends BinaryHeap {
    constructor(items: number[] = []) {
        super(items);
    }

    protected shouldSwap(value1: number, value2: number): boolean {
        return value1 < value2;
    }
}
