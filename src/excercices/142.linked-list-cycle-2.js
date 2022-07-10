import { assert } from 'console';
import { expect } from 'earljs';
import { ListNode } from '../structures/linked-list.js';
import { arrayToList } from '../utils/linked-list.js';

/*
Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be
reached again by continuously following the next pointer. Internally, pos is used
to denote the index of the node that tail's next pointer is connected to (0-indexed).
It is -1 if there is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

Example1:

Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.

Example2:

Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.

Example3:

Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.

Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.
*/

/*
My approach: Use a Set (hash) to keep track of which nodes were already visit
while traversing the list. At the moment we find a node already in the Set,
thad node is the beginning of the cycle. If we reach the end of the list, it
meand there is no cycke,

Time complexity: O(n)
Space complexity: O(n)
*/
function detectCycle(head) {
  const visited = new Set();
  let curr = head;

  while (curr !== null && !visited.has(curr)) {
    visited.add(curr);
    curr = curr.next;
  }

  return curr;
}

/*
The floyd algorithm with Hare and Tortoise is not as straightforward since it relies
on some mathematical theorem to determine the entry point of a cycle. I don't think
I would have been able to figure out phase 2 by intuition without knowing the math
behind it beforehand.

It goes in two phases:

1) A first phase where it uses two pointers (one fast and other slow) to determine of
the list has a cycle. The fast pointer moves twice as fast as the slow one. If there
is a cycle, at some point both pointers are going to meet each other again. This
phase only discovers cycles but we have no guarantee that the node where both pointers
meet is the entrance of the cycle, that is where phase 2 comes in.

2) The second phase is where things get a bit complicated. It also uses two pointers but
in this case, they both move at the same speed of 1. The first pointer starts at the head
of the list while the second pointer starts at the intersection point we calculated in
the phase 1. Because at this point we already know the list is cyclical, pointer1 and
pointer2 are going to meet sooner or later (pointer2 is going in circles).
Mathemaically, it is true that the node where pointer1 and pointer2 intersect will always
be the entry of the cycle.

Mathematical explanation:

      X
├───────────┤├─────────────┐
(1) → (2) → (3) → (4) → (5)│
             ↑           ↓ │ Y
            (8) ← (7) ← (6)│
                   ├───────┘


t = 1 2 3 4 5 6 7
h = 1 3 5 7 3 5 7
Intersection point: 7

X = Distance between the head(starting) to the loop starting point.
Y = Distance between the loop starting point and the first meeting point of both the pointers.
C = The distance of the loop

The slow pointer has traveled X + Y + s * C distance, where s is any positive constant number.
The fast pointer has traveled X + Y + f * C distance, where f is any positive constant number.

Since the fast pointer is moving twice as fast as the slow pointer,
we can say that the fast pointer covered twice the distance the slow pointer covered. Therefore:

 X + Y + f * C = 2 * (X + Y + s * C)
 X + Y = f * C – 2 * s * C

We can say that,

f * C – 2 * s * C = (some integer) * C

                         = K * C

Thus,

X + Y = K * C       – ( 1 )
X = K * C – Y       – ( 2 )

Where K is some positive constant.

Now if reset the slow pointer to the head(starting position) and move both fast and
slow pointer by one unit at a time, one can observe from 1st and 2nd equation that
both of them will meet after traveling X distance at the starting of the loop because
after resetting the slow pointer and moving it X distance, at the same time from loop
meeting point the fast pointer will also travel K * C – Y distance(because it already
has traveled Y distance).

From equation (2) one can say that X = K * C – Y therefore, both the pointers will
travel the distance X i.e. same distance after the pink node at some point to meet at
the starting point of the cycle.

Here, by some point, it means that the fast pointer can complete the K * C distance out
of which it has already covered the Y distance.

*/
function detectCycleFloyd(head) {
  // Phase 1
  const cycleIntersection = doesContainCycle(head);
  if (cycleIntersection === null) return null;

  // Phase 2
  const cycleEntryNode = getCycleEntryNode(head, cycleIntersection);
  return cycleEntryNode;
}

function doesContainCycle(head) {
  if (head === null || head.next === null) return null;

  let tortoise = head;
  let hare = head;

  while (hare !== null && hare.next !== null) {
    tortoise = tortoise.next;
    hare = hare.next.next;

    if (tortoise === hare) {
      return hare;
    }
  }

  return null;
}

function getCycleEntryNode(head, intersection) {
  let p1 = head;
  let p2 = intersection;

  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }

  return p1;
}

const node1 = new ListNode(3);
const node2 = new ListNode(2);
const node3 = new ListNode(0);
const node4 = new ListNode(-4);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node2;

expect(detectCycleFloyd(node1).val).toEqual(2);

/*
(3) → (2)  → (0)
       ↑      ↓
       ↑ ← ← (4)

t = 3 2 0 4 2 0 4
h = 2 4 2 4
*/
