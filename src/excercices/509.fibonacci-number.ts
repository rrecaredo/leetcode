import { expect } from 'earljs';

/*
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci
sequence, such that each number is the sum of the two preceding ones, starting
from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).

Example 1:

Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
Example 2:

Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
Example 3:

Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.


Constraints:

0 <= n <= 30
*/

/*
The solution is to use an array to build up the results of each of
fibonacci values from 0 to n incrementally. By doing so, we leverage
the previous results to calculate next results. As a consequence we
can say this algorithm is using dynamic programming techniques.

Time complexity: O(n)
Space complexity: O(n)
*/
function fib(n: number): number {
    if (n < 2) return n;
    const results = [0, 1];

    for (let i = 2; i <= n; i++) {
        results[i] = results[i - 1] + results[i - 2];
    }

    return results.at(-1);
};

/*
This is a modified and space optimized variant of the above code.
Instead of storing all and every result in an array, we only need
two extra variables to keep track of the result of fibonacci for the
last two numbers.

Time complexity: O(n)
Space complexity: O(1)
*/
function fibOptimized(n: number): number {
    if (n < 2) return n;

    let prev1 = 1;
    let prev2 = 0;
    let current = 0;

    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return current;
};

/*
Alternatively, we can use a hash object to store the result of appliyng fibonacci
to each number. Once we store the result of fibonacci(x) we can retrieve that
information in future iterations so that we only calculate fibonacci of x once, for
each possible x.

Without the hash object, this algorithm would had a O(2ⁿ) time complexity wich is
really bad and would stack overflow with relatively small numbers like 1000 or 2000.

Time complexity: O(n)
Space complexity: O(n)
*/
function fibWithHash(n: number): number {
    const cache = { 0: 0, 1: 1 };

    const fibonacci = (_n: number) => {
        if (!(_n in cache)) cache[_n] = fibonacci(_n - 2) + fibonacci(_n - 1);

        return cache[_n];
    };

    return fibonacci(n);
};

function fibonacciRecursive(n: number): number {
    if (n < 2) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

expect(fibOptimized(50)).toEqual(12586269025)
