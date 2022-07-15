import { expect } from 'earljs';
import { ListNode } from '../structures/linked-list';
import { arrayToList } from '../utils/linked-list';

/*
Given the head of a singly linked list, return the middle node of the linked list.
If there are two middle nodes, return the second middle node.

Example 1:

Input: head = [1,2,3,4,5]
Output: [3,4,5]
Explanation: The middle node of the list is node 3.

Example 2:

Input: head = [1,2,3,4,5,6]
Output: [4,5,6]
Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.
Constraints:

The number of nodes in the list is in the range [1, 100].
1 <= Node.val <= 100

*/

/*
This was my first approach and it is failry simple.
It uses recursivity so as to move through the list. For each call it passes a counter
with the number of visited nodes. Then, it returns an object containing the total count
(which is set by the last call in the stack) and a potential solution. If the current
position corresponds to the middle point of the list (we know the current position and
the number of nodes already), then the head from that call is the final solution and we
bubble it back through the call stack.

Time complexity: O(n)
Space complexity: O(1)
*/
function middleNode(head: ListNode) {
  const result = _middleNode(head, 1);

  return result.node;
}

function _middleNode(head: ListNode, count: number) {
  if (head === null) {
    return { count, node: null };
  }

  const result = _middleNode(head.next, count + 1);

  if (count === Math.ceil(result.count / 2)) {
    return { count: result.count, node: head };
  }

  return result;
}

/*
Approach 2: Using 2 pointers, one fast and one slow
When traversing the list with a pointer slow, make another pointer fast that traverses twice as fast.
When fast reaches the end of the list, slow must be in the middle.

Time complexity: O(n)
Space complexity: O(1)
*/
function middleNodeTwoPointers(head: ListNode) {
  let slow = head;
  let fast = head;

  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}

/*
This is another solution I wrote for fun only. It is probably how I would implement
it in real life (recursion in javascript is rarely a good idea).

It traverses the list and stores references of each node in a dictionary by its numbered
position within the list. Lastrly, it calculates the middle point

Time complexity: O(n)
Space complexity: O(n)
*/
function middleNodeWithHash(head: ListNode) {
  const hash = {};
  let curr = head;
  let i = 1;

  while (curr !== null) {
    hash[i] = curr;
    i++;
    curr = curr.next;
  }

  const middle = Math.ceil(i / 2);

  return hash[middle];
}

const list1 = arrayToList([1, 2, 3, 4, 5]);
const list2 = arrayToList([1, 2, 3, 4, 5, 6]);

expect(middleNode(list1)).toEqual(arrayToList([3, 4, 5]));
expect(middleNode(list2)).toEqual(arrayToList([4, 5, 6]));

expect(middleNodeWithHash(list1)).toEqual(arrayToList([3, 4, 5]));
expect(middleNodeWithHash(list2)).toEqual(arrayToList([4, 5, 6]));

expect(middleNodeTwoPointers(list1)).toEqual(arrayToList([3, 4, 5]));
expect(middleNodeTwoPointers(list2)).toEqual(arrayToList([4, 5, 6]));
