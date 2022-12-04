const log = console.log;

/* 
Link: https://www.geeksforgeeks.org/pangram-checking/
1. Check if given String is Pangram or not. (A pangram is a sentence containing every letter in the English Alphabet)
*/

const checkPangram = (str) => {
    const check = new Array(26).fill(false);
    let index = -1;

    for (let i = 0; i < str.length; i++) {
        if ('A' <= str[i] && 'Z' >= str[i]) {
            index = str.charCodeAt(i) - 'A'.charCodeAt(0);
        } else if ('a' <= str[i] && 'z' >= str[i]) {
            index = str.charCodeAt(i) - 'a'.charCodeAt(0);
        } else {
            continue;
        }
        check[index] = true;
    }

    return check.every(Boolean);
}

/* 
Link: https://www.geeksforgeeks.org/missing-characters-make-string-pangram/
2. Missing characters to make a string Pangram
*/

const missingChar = (str) => {
    const check = new Array(26).fill(false);
    let index = -1;
    let isPanagram;
    let result = [];

    for (let i = 0; i < str.length; i++) {
        if ('A' <= str[i] && 'Z' >= str[i]) {
            index = str.charCodeAt(i) - 'A'.charCodeAt(0);
        } else if ('a' <= str[i] && 'z' >= str[i]) {
            index = str.charCodeAt(i) - 'a'.charCodeAt(0);
        } else {
            continue;
        }
        check[index] = true;
    }

    isPanagram = check.every(Boolean);

    if (isPanagram) {
        return '';
    }

    for (let j = 0; j < check.length; j++) {
        if (!check[j]) {
            result.push(String.fromCharCode(97 + j));
        }
    }

    return result.join('');
}

/* 
Link: https://www.geeksforgeeks.org/removing-punctuations-given-string/
3. Removing punctuations from a given string
*/

const removePunctuations = (str) => {
    return str.replace(/[^a-zA-Z]/g, "");
}

/* 
Link: https://www.geeksforgeeks.org/find-one-extra-character-string/
4. Find one extra character in a string
*/

const findExtraChar = (str1, str2) => {
    let codeStr1 = 0;
    let codeStr2 = 0;
    let extraChar = '';

    for (let i = 0; i < str1.length; i++) {
        codeStr1 += str1.charCodeAt(i);
    }

    for (let j = 0; j < str2.length; j++) {
        codeStr2 += str2.charCodeAt(j);
    }

    extraChar = (codeStr1 - codeStr2) === 0 ? '' : String.fromCharCode(Math.abs(codeStr1 - codeStr2));

    return extraChar;
}

/* 
Link: https://www.geeksforgeeks.org/calculate-sum-of-all-numbers-present-in-a-string/
5. Calculate sum of all numbers present in a string
*/

const calSum = (str) => {
    let total = 0;
    let temp = '';

    for (let i = 0; i < str.length; i++) {
        if (Number(str[i])) {
            temp += str[i];
        } else {
            total += Number(temp);
            temp = '';
        }
    }

    total += Number(temp);

    return total;
}

/* 
Link: https://www.geeksforgeeks.org/calculate-difficulty-sentence/
6. Calculate difficulty of a given sentence. Here a Word is considered hard if it has 4 consecutive consonants or number of consonants is more than number of vowels. Else word is easy. Difficulty of sentence is defined as 5*(number of hard words) + 3*(number of easy words).
*/

const sentenceDifficulty = (sentence) => {
    const words = sentence.toLowerCase().split(' ');
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    let difficultyLevel = 0;
    let easyLevel = 0;

    words.forEach(word => {
        if (isDifficultWord(word)) {
            difficultyLevel++;
        } else {
            easyLevel++;
        }
    })

    return 5 * (difficultyLevel) + 3 * (easyLevel);

    function isDifficultWord(word) {
        let consonantsCount = 0;
        let vowelsCount = 0;
        let flag = 0;

        for (let i = 0; i < word.length; i++) {
            if (vowels.includes(word[i])) {
                vowelsCount++;
                flag = 0;
            } else {
                consonantsCount++;
                flag++;
            }

            if (flag >= 4) {
                return true;
            }
        }

        return (consonantsCount > vowelsCount);
    }
}

/* 
Link: https://www.geeksforgeeks.org/minimum-index-sum-common-elements-two-lists/
7. Minimum Index Sum for Common Elements of Two Lists
*/

//Brute Force Approach
const minIdxSum = (list1, list2) => {
    let minIndexSum = Number.POSITIVE_INFINITY;

    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list2.length; j++) {
            if (list1[i] === list2[j]) {
                if (minIndexSum < (i + j)) {
                    continue;
                }

                minIndexSum = i + j;
                log(list1[i], minIndexSum);
            }
        }
    }
}

//Using Hashing
const minIdxSumHashing = (list1, list2) => {
    const map = new Map();
    let minSum = Number.POSITIVE_INFINITY;
    let result = [];

    for (let i = 0; i < list1.length; i++) {
        if (map.has(list1[i])) {
            let val = map.get(list1[i]);
            if (val > i) {
                map.set(list1[i], i);
            }
        } else {
            map.set(list1[i], i);
        }
    }

    for (let j = 0; j < list2.length; j++) {
        if (map.has(list2[j])) {
            let val = map.get(list2[j]);
            if (minSum > val + j) {
                minSum = val + j;
                result = []
                result.push(list2[j]);
            } else if (minSum === val + j) {
                result.push(list2[j])
            }
        }
    }

    return result;
}

/* 
Link: https://www.geeksforgeeks.org/count-number-of-substrings-with-exactly-k-distinct-characters/
8. Given a string of lowercase alphabets, count all possible substrings (not necessarily distinct) that has exactly k distinct characters. 
*/

const isDistinct = (str, k) => {
    let set = new Set([...str]);
    return set.size === k;
}

// O(N^3)
const allSubStrs = (str) => {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            result.push(str.substring(i, j + 1));
        }
    }
    return result;
}

// Check how to implement efficient approach.

// Brute Force Approach. Generate  all sub-strings and check each one for the condition.
const kDistinctCharsBruteForce = (str, k) => {
    let res = allSubStrs(str);
    let ans = [];
    for (let i = 0; i < res.length; i++) {
        if (isDistinct(res[i], k)) {
            ans.push(res[i])
        }
    }

    return ans;
}

// Optimum Approach: Process each substring while looping through each substring. Create a new Array or Map to store the visited values for each new starting point and store the count of each value.
// Time: O(N^2)
// Space: O(1)
const kDistinctChars = (str, k) => {
    let res = 0;
    let temp = [];

    for (let i = 0; i < str.length; i++) {
        let dist_count = 0;
        let cnt = Array.from({ length: 26 }, () => 0);

        for (let j = i; j < str.length; j++) {
            if (cnt[str[j].charCodeAt(0) - 'a'.charCodeAt(0)] == 0) {
                dist_count++;
            }

            cnt[str[j].charCodeAt(0) - 'a'.charCodeAt(0)]++;

            if (dist_count == k) {
                temp.push(str.substring(i, j + 1));
                res++;
            }
        }
    }

    log(temp);
    return res;
}

/* 
Link: https://www.geeksforgeeks.org/number-substrings-count-character-k/
9. Given a string and an integer k, find the number of substrings in which all the different characters occur exactly k times. 
*/

// Time: O(N^2)
// Space: O(1)
const countofCharK = (str, k) => {
    let res = 0;
    for (let i = 0; i < str.length; i++) {
        let freq = Array.from({ length: 26 }, () => 0);

        for (let j = i; j < str.length; j++) {
            let index = str[j].charCodeAt(0) - 'a'.charCodeAt(0);
            freq[index] += 1;

            if (freq[index] > k) {
                break;
            } else if (freq[index] === k && check(freq, k)) {
                res++;
            }
        }
    }

    return res;
}

function check(freq, k) {
    for (let i = 0; i < 26; i++) {
        if (freq[i] !== 0 && freq[i] !== k) return false;
    }

    return true;
}

/* 
Link: https://www.geeksforgeeks.org/number-substrings-string/
10. Find total number of non-empty substrings of a string with N characters. 
*/

//Count of non-empty substrings is n*(n+1)/2
// If we include empty string also as substring, the count becomes n*(n+1)/2 + 1

const countNonEmptySubstr = (str) => {
    let n = str.length;
    return n * (n + 1) / 2;
}

/* 
Link: https://www.geeksforgeeks.org/string-k-distinct-characters-no-characters-adjacent/
11. Given n and k, print a string that has n characters. The string should have exactly k distinct characters and no adjacent positions.
*/

const findString = (n, k) => {
    let initial = 97;
    let res = '';
    let s = 0;

    for (let i = 0; i < n; i++) {
        if (s === k) {
            s = 0
        }
        res += String.fromCharCode(initial + s);
        s++;
    }

    return res;
}

/* 
Link: https://www.geeksforgeeks.org/find-kth-character-of-decrypted-string/
12. Find k’th character of decrypted string.
*/

// Time: O(N)
// Space: O(1)
const kthChar = (str, k) => {
    let decryptedStr = '';
    let count = 1;
    let incremented = false;
    for (let i = 0; i < str.length;) {
        incremented = false;
        let temp = '';
        count = 1

        while (i < str.length && isNaN(str[i])) {
            temp += str[i];
            i++;
            incremented = true;
        }

        if (!isNaN(str[i])) {
            let cnt = '';
            while (i < str.length && !isNaN(str[i])) {
                cnt += str[i];
                i++;
                incremented = true;
            }
            count = cnt;
        }

        for (let d = 0; d < count; d++) {
            decryptedStr += temp;
        }

        if (!incremented) {
            i++;
        }
    }

    return decryptedStr[k - 1];
}

let str = 'ab4c12ed3hj';
// ababababccccccccccccedededhj
// ababababccccccccccccededed
let k = 21;
log(kthChar(str, k));
