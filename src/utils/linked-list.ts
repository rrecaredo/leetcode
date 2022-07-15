import { ListNode } from '../structures/linked-list';

function insert(root: ListNode, item: number) {
  const temp = new ListNode();
  let ptr = null;
  temp.val = item;
  temp.next = null;

  if (root == null) {
    root = temp;
  } else {
    ptr = root;
    while (ptr.next != null) {
      ptr = ptr.next;
    }
    ptr.next = temp;
  }
  return root;
}

export function arrayToList(arr = []) {
  let root = null;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    root = insert(root, arr[i]);
  }
  return root;
}
