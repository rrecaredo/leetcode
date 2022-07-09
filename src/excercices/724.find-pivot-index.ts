import { expect } from 'earljs';

/*
Given an array of integers nums, calculate the pivot index of this array.

The pivot index is the index where the sum of all the numbers strictly to the left of the index is equal to the sum of all the numbers strictly to the index's right.

If the index is on the left edge of the array, then the left sum is 0 because there are no elements to the left. This also applies to the right edge of the array.

Return the leftmost pivot index. If no such index exists, return -1.

Example 1:

Input: nums = [1,7,3,6,5,6]
Output: 3
Explanation:
The pivot index is 3.
Left sum = nums[0] + nums[1] + nums[2] = 1 + 7 + 3 = 11
Right sum = nums[4] + nums[5] = 5 + 6 = 11
Example 2:

Input: nums = [1,2,3]
Output: -1
Explanation:
There is no index that satisfies the conditions in the problem statement.
Example 3:

Input: nums = [2,1,-1]
Output: 0
Explanation:
The pivot index is 0.
Left sum = 0 (no elements to the left of index 0)
Right sum = nums[1] + nums[2] = 1 + -1 = 0


Constraints:

1 <= nums.length <= 104
-1000 <= nums[i] <= 1000
*/

/*
My first solution uses two separate arrays of the same size of the original array.
A totalFw array, that for every element, it holds the value of the sum of elements at its left.
A totalBw array, that for every element, it holds the value of the sum of elements at its right.
It then uses these 2 arrays ro evaluate at every position of the array if the sum from the
left matches the sum from the right.
If no match is found, it returns -1, otherwise it returns the position of the matched element.

                                *
Original array  : [ 1,  7,  3,  6,  5,  6]
Total Forward   : [ 0,  1,  8, 11, 17, 23]
Total Backwards : [27, 20, 17, 11,  6,  0]

Solution is 3 because totalFw[2] = 17 and totalBw[4] = 17

Time complexity is O(n) + O(n) + O(n) which is O(3n) -> O(n)
Extra space complexity is O(2n) -> O(n)
*/
function pivotIndex(nums: number[]): number {
  let totalFw = 0;
  let totalBw = 0;
  const n = nums.length - 1;

  const sumFw = nums.map((num) => (totalFw += num));
  const sumBw = nums
    .reverse()
    .map((num) => (totalBw += num))
    .reverse();

  let i = 0;

  for (i; i <= n; i++) {
    const leftCount = i === 0 ? 0 : sumFw[i - 1];
    const rightCount = i === n ? 0 : sumBw[i + 1];

    if (leftCount === rightCount) break;
  }

  return i > n ? -1 : i;
}

/*
This is a much simpler solution and it uses less space and requires less
iterations.
First it aggregates the total number of elements into a sum variable.
Then it loops through the array and because it knows the total sum, the current number
and it build the leftSum progressively, it can calculate if the left sum matches
the right sum.

Original array  : [ 1,  7,  3,  6,  5,  6]
Total sum: 28

Cold run:

i: 0
n[i]: 1
leftSum: 0
rightSum: 28 - 1 - 0 = 27
27 != 0

i: 1
n[i]: 7
leftSum: 1
rightSum: 28 - 7 - 1 = 20
20 != 1

i: 2
n[i]: 3
leftSum: 8
rightSum: 28 - 8 - 3 = 17
17 != 8

i: 3
n[i]: 6
leftSum: 11
rightSum: 28 - 6 - 11 = 11
11 == 11

Time complexity: O(n)
Extra space complexity: O(1)

*/
function pivotIndexOptimized(nums: number[]): number {
  const n = nums.length;
  const sum = nums.reduce((acc, curr) => acc + curr, 0);
  let leftSum = 0;

  for (let i = 0; i < n; i++) {
    const rightSum = sum - nums[i] - leftSum;

    if (rightSum === leftSum) return i;

    leftSum += nums[i];
  }

  return -1;
}

type PivotIndexFn = (nums: number[]) => number;

function assert(fn: PivotIndexFn) {
  expect(fn([1, 7, 3, 6, 5, 6])).toEqual(3);
  expect(fn([2, 7, 5, 3, 2, 6, 5, 6])).toEqual(4);
  expect(fn([1, 2, 3])).toEqual(-1);
  expect(fn([2, 1, -1])).toEqual(0);
  expect(fn([-1, -1, -1, -1, 0, 0])).toEqual(-1);
  expect(fn([-1, -1, -1, 1, 1, 1])).toEqual(-1);
}

assert(pivotIndex);
assert(pivotIndexOptimized);
