import { expect } from 'earljs';

/*
Given an array of integers nums which is sorted in ascending order,
and an integer target, write a function to search target in nums.
If target exists, then return its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.

Example 1:

Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
Example 2:

Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1

Constraints:

1 <= nums.length <= 104
-104 < nums[i], target < 104
All the integers in nums are unique.
nums is sorted in ascending order.
*/

/*
Time complexity: O(logn)
Space complexity: O(1)
*/
function search(nums: number[], target: number) {
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        let middle = Math.floor((left + right) / 2);
        if (nums[middle] === target) {
            return middle;
        } else if (nums[middle] < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return -1;
}

/*
Time complexity: O(logn)
Space complexity: O(1)
*/
function searchRecursive(nums: number[], target: number) {
    return _search(nums, target, 0, nums.length - 1);
}

function _search(nums: number[], target: number, left: number, right: number) {
    if (left > right) return -1;

    let middle = Math.floor((left + right) / 2);

    if (nums[middle] === target) {
        return middle;
    } else if (nums[middle] < target) {
        return _search(nums, target, left + 1, right);
    } else {
        return _search(nums, target, left, right - 1);
    }
}

expect(search([-1, 0, 3, 5, 9, 12], 9)).toEqual(4);
expect(searchRecursive([-1, 0, 3, 5, 9, 12], 9)).toEqual(4);
