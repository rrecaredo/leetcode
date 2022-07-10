import { expect } from 'earljs';

/*
Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.

Constraints:

1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.
*/

/*
This was my initial take on this excercise.
I used a hashmap to collect information about the number of occurences of each
char in the original string.

Then I sum the total amount of chars and remove the leftovers.
I consider leftovers as the number of chars that don't have matching partners
except for one (because the char in the middle of the palindrome word does not need
a matching element).

Time complexity: O(n) + O(m) -> O(n)
Space complexity: O(m)
*/
function longestPalindrome(s: string) {
    if (s.length === 1) return 1;

    const hash = new Map<string, number>();

    for (let c of s) {
        let current = hash.get(c) || 0;
        hash.set(c, current + 1);
    }

    let leftovers = 0;
    let palindromeLength = 0;

    for (const [, value] of hash) {
        palindromeLength += value;

        if (value % 2 !== 0) {
            leftovers++;
        }
    }

    if (leftovers > 1) {
        palindromeLength -= leftovers - 1;
    }

    return palindromeLength;
}

/*
This is a fairly simpler solution that uses a set instead of a map and it
generally consumes less memory space (although it is also O(n) in the worst case)

This algorithm uses a result variable to build the result incrementslly.

Similarly, it iterates through the original string char by char, but this time,
instead of storing the number of occurences in a map, we use a Set to keep track
of the chars with no matching pairs yet. When we find a char that is not in the
Set, we add it and when we encounter its partner, we remove it. Every time we
have a partnership, we increment the result in 2.

At the end of the loop, if the Set is not empty, it means we have chars with
unmatched pairs. If this is the case we sum 1 to the final result as only 1
unmatched char can be used (middle of the word).

Time complexity: O(n)
Space complexity: O(n)
*/
function longestPalindromeOptimized(s: string) {
    const unmatched = new Set();
    let result = 0;

    for (let c of s) {
        if (unmatched.has(c)) {
            unmatched.delete(c);
            result += 2;
        } else {
            unmatched.add(c);
        }
    }

    return unmatched.size > 0 ? result + 1 : result;
}

expect(longestPalindrome('abccccdd')).toEqual(7);
expect(longestPalindrome('a')).toEqual(1);
expect(
    longestPalindrome('civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth')
).toEqual(983);