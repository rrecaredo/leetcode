import { expect } from "earljs";

/*
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).

Example 1:

Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false

Constraints:

0 <= s.length <= 100
0 <= t.length <= 104
s and t consist only of lowercase English letters.

Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 109, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?
*/

/*
I think the easiest solution is to use two pointers iterativvely, one for the source string
and another for the target.
We move the target pointer on every iteration but we only move the source pointer when there
is a match with target (source[j] === target[i])

Time complexity: O(n)
Extra space complexity: O(1)
*/
function isSubsequence(s: string, t: string): boolean {
  let i = 0;
  let j = 0;

  while (i < t.length && j < s.length) {
    if (s[j] === t[i]) j++;
    i++;
  }

  return j === s.length;
}

/*
Follow up:

Knowing we will use the same target to calculate if many sources are subsequence,
this solutions builts a dictonary during instantiation wich maps the positions of
all the charts from target.

Example:

target: ahbggdca

{
    a: [0, 7],
    h: [1],
    b: [2],
    g: [3, 4],
    d: [5],
    c: [6]
}

Then for each isSubsequence calculation, the algorithm just need to iterate
over the source string and verify that it exists and also that its position
on the target string is after the position of the previous element.

*/
class SequenceCalculator {
  private hash: Record<string, number[]> = {};

  constructor(target: string) {
    this.generateHash(target);
  }

  isSubsequence(source: string) {
    let currentTargetIndex = -1;

    for (let i = 0; i < source.length; i++) {
      if (source[i] in this.hash) {
        const foundIndex = this.hash[source[i]].find((s) =>
          s > currentTargetIndex
        );

        if (foundIndex !== undefined) {
          currentTargetIndex = foundIndex;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  private generateHash(target: string) {
    for (let i = 0; i < target.length; i++) {
      if (target[i] in this.hash) {
        this.hash[target[i]].push(i);
      } else {
        this.hash[target[i]] = [i];
      }
    }
  }
}

expect(isSubsequence("abc", "ahbgdc")).toBeTruthy();
expect(isSubsequence("axc", "ahbgdc")).toBeFalsy();

const sequenceCalculator = new SequenceCalculator("ahbgdca");

expect(sequenceCalculator.isSubsequence("abc")).toBeTruthy();
expect(sequenceCalculator.isSubsequence("axc")).toBeFalsy();
