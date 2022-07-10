import { expect } from 'earljs';

/*
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
*/

/*
We only need to loop through the array only once.
We move one pointer on each iteration (i) while keeping the value of the minimun seen
value stored in a variable (minPrice). Evetytime we find a new price
smaller than the previows minimum, we update minPrice with the new minimum.

We start with an initial maxProfit of 0 and we also update it on each iteration;
if the delta between the price at i and minPrice is greater than the stored
maxProfit, we update it, otherwise we maintain the current value.

After the loop, we have done all the math and we know that whatever is stored
in maxProfit is the value we want to return.

Time complexity: O(n)
Space complexity: O(1)
*/
function maxProfit(prices: number[]) {
    if (prices.length === 1) return 0;

    let maxProfitFound = 0;
    let minPrice = prices[0];

    for (let i = 1; i < prices.length; i++) {
        maxProfitFound = Math.max(maxProfitFound, prices[i] - minPrice);

        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }
    }

    return maxProfitFound;
}

expect(maxProfit([7, 1, 5, 3, 6, 4])).toEqual(5);
expect(maxProfit([2, 1, 4])).toEqual(3);
expect(maxProfit([1, 2])).toEqual(1);
expect(maxProfit([2, 1])).toEqual(0);
expect(maxProfit([2])).toEqual(0);