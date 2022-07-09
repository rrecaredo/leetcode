import { expect } from "earljs";
import { arrayToList } from "../utils/linked-list.js";

/*
Given the head of a singly linked list, reverse the list, and return the reversed list.

Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Input: head = [1,2]
Output: [2,1]

Input: head = []
Output: []

Constraints:

The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000


Follow up: A linked list can be reversed either iteratively or recursively. Could you implement both?


The idea behind the iterative solution is to imagine like if the direction of the linked list
were the other way around. We want to change the direction of each node with its predecesor.
For doing this, we keep two pointers, one for the prev element, and other for the current element.
We then move the current pointer on each iteration until we reach the end of the list. For each iteration
we make current to point the the previous and we make the node after current the new current and current the new previous.

Cold run:

Starting point:

1 -> 2 -> 3 -> 4 -> 5 -> null

Curr: 1

 null      1 -> 2 -> 3 -> 4 -> 5 -> null
[prev]  [curr]

Curr: 2

   1 -> null    2 -> 3 -> 4 -> 5 -> nulll
[prev]       [curr]

Curr: 3

   2 -> 1 -> null    3 -> 4 -> 5 -> null
[prev]             [curr]

Curr: 4

   3 -> 2 -> 1 -> null   4 -> 5 -> null
[prev]                 [curr]

Curr: 5

   4 -> 3 -> 2 -> 1 -> null   5 -> null
[prev]                      [curr]

Curr: null

   5- > 4 -> 3 -> 2 -> 1 -> null   null
[prev]                            [curr]

*/

/*
Time complexity: O(n)
Space complexity: O(1)
*/
function reverseList(head) {
  if (head == null || head.next == null) return head;

  let prev = null;
  let curr = head;

  while (curr !== null) {
    let next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

const l1 = arrayToList([1, 2, 3, 4, 5]);
const l2 = arrayToList([5, 4, 3, 2, 1]);

expect(reverseList(l1)).toEqual(l2);
