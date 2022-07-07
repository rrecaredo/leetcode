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

class ListNode {
  val;
  next;

  constructor(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function mergeTwoLists(list1, list2) {
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
    return l2;
  } else {
    return l1;
  }

  return final;
}

const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

console.log(JSON.stringify(mergeTwoLists(l1, l2), null, 2));
