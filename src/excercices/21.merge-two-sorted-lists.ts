import { expect } from 'earljs';
import { ListNode } from '../structures/linked-list';
import { arrayToList } from '../utils/linked-list';

/*
You are given the heads of two sorted linked lists list1 and list2.

Merge the two lists in a one sorted list. The list should be made by splicing
together the nodes of the first two lists.

Return the head of the merged linked list.

Example1:

Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Example 2:

Input: list1 = [], list2 = []
Output: []
Example 3:

Input: list1 = [], list2 = [0]
Output: [0]

Constraints:

The number of nodes in both lists is in the range [0, 50].
-100 <= Node.val <= 100
Both list1 and list2 are sorted in non-decreasing order.
*/

/*
Time complexity: O(n + m)
Space complexity: O(n + m)
*/
function mergeTwoLists(list1: ListNode, list2: ListNode) {
  if (list1 == null && list2 == null) {
    return null;
  }

  const final = new ListNode();

  if (list1 != null && list2 != null) {
    if (list1.val > list2.val) {
      final.val = list2.val;
      final.next = mergeTwoLists(list1, list2.next);
    } else {
      final.val = list1.val;
      final.next = mergeTwoLists(list1.next, list2);
    }
  } else if (list1 == null) {
    return list2;
  } else {
    return list1;
  }

  return final;
}

const list1 = arrayToList([1, 2, 4]);
const list2 = arrayToList([1, 3, 4]);
const expectation = arrayToList([1, 1, 2, 3, 4, 4]);

expect(mergeTwoLists(list1, list2)).toEqual(expectation);
