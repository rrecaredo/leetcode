import { assert, assertFalse } from "../deps.ts";

/*
Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

Example 1:

Input: s = "egg", t = "add"
Output: true
Example 2:

Input: s = "foo", t = "bar"
Output: false
Example 3:

Input: s = "paper", t = "title"
Output: true

Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
*/

/*
My approach was to convert char by char from s to t and use two
dictionaries to control the chars that I have already used so they are taken
from the cache, and also to control that no two chars from t are mapped
to the same char from s. In the end, I check that the transformed string
is equal than the expected string. If two chars from t are mapped with
the same char from s, it returns false.

Time complexity: O(n)
Space complexity: O(n)
*/
function isIsomorphic(s: string, t: string): boolean {
  const left = new Map();
  const right = new Map();
  const n = s.length;
  let updatedT = "";

  for (let i = 0; i < n; i++) {
    if (left.has(s[i])) {
      updatedT = updatedT.concat(left.get(s[i]));
    } else if (!right.has(t[i])) {
      updatedT = updatedT.concat(t[i]);
      left.set(s[i], t[i]);
      right.set(t[i], s[i]);
    } else {
      return false;
    }
  }

  return t === updatedT;
}

/*
This is a more optimal solution that only uses one dictionary.
The idea is that after filling up the dictionary, there should
not be any duplicates in it.
*/
function isIsomorphicOptimised(s: string, t: string) {
  const m = new Map();
  const n = s.length;

  for (let i = 0; i < n; i++) {
    if (!m.has(s[i])) {
      m.set(s[i], t[i]);
    } else {
      // if the value in the cache is different than the char in t
      // it means it is a duplicate.
      if (m.get(s[i]) != t[i]) {
        return false;
      }
    }
  }
  return new Set([...m.values()]).size == m.size;
}

type IsIsomorphicFn = (s: string, t: string) => boolean;

function doAssert(fn: IsIsomorphicFn) {
  assert(fn("egg", "add"));
  assert(fn("paper", "title"));
  assertFalse(fn("foo", "bar"));
  assertFalse(fn("badc", "bada"));
  assertFalse(fn("egcd", "adfd"));
}

doAssert(isIsomorphic);
doAssert(isIsomorphicOptimised);
