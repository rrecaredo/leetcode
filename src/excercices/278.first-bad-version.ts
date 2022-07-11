/*
You are a product manager and currently leading a team to develop a new product.
Unfortunately, the latest version of your product fails the quality check.
Since each version is developed based on the previous version, all the versions
after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first
bad one, which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version
is bad. Implement a function to find the first bad version. You should minimize
the number of calls to the API.

Example 1:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
Example 2:

Input: n = 1, bad = 1
Output: 1

Constraints:

1 <= bad <= n <= 231 - 1
*/

/*
Time complexity: O(logn)
Space complexity: O(1)
*/
function solution(isBadVersion: (i: number) => boolean) {
    return (n: number) => {
        if (n === 1) return isBadVersion(1) ? 1 : 0;

        let left = 1;
        let right = n;

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);
            if (isBadVersion(middle)) {
                if (middle === 1) return 1;

                if (!isBadVersion(middle - 1)) {
                    return middle;
                } else {
                    right = middle - 1;
                }

            } else {
                left = middle + 1;
            }
        }
    };
}

/*
This variant uses less code but it requires more iterations generally.
The avobe solution returns the value the first time it evaluates it
whereas this solution keeps iterating until left and right find each other.

Time complexity: O(logn)
Space complexity: O(1)
*/
function firstBadVersionSimplified(isBadVersion: (i: number) => boolean) {
    return (n: number) => {
        let left = 1;
        let right = n;

        while (left < right) {
            let mid = Math.floor((right + left) / 2);
            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    };
}
