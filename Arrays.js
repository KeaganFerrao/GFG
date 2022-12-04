const log = console.log;

/* 
Link: https://www.geeksforgeeks.org/array-rotation/
1. Given an array of integers arr[] of size N and an integer, the task is to rotate the array elements to the left by d positions.
*/

//This approach creates a new Array
// Time - O(N)
// Space - O(N)
const rotate = (arr, d) => {
    if (d >= arr.length) {
        d = d % arr.length;
    }

    if (d === 0) return [...arr];

    const temp = [];

    for (let i = d; i < arr.length; i++) {
        temp.push(arr[i]);
    }

    for (let i = 0; i < d; i++) {
        temp.push(arr[i]);
    }

    return temp;
}

//This approach uses Juggling Algorithm for Array rotation
//This approach modifies Array in place
// Time - O(N)
// Space - O(1)
const rotateJuggling = (arr, d) => {
    if (d >= arr.length) {
        d = d % arr.length;
    }

    if (d === 0) return arr;

    const gcd = (a, b) => {
        if (b === 0) return a;
        else return gcd(b, a % b);
    }

    let GCD = gcd(arr.length, d);

    for (let i = 0; i < GCD; i++) {
        let temp = arr[i];
        let j = i;

        while (true) {
            let k = j + d;
            if (k >= arr.length) {
                k = k - arr.length;
            }

            if (k === i) break;

            arr[j] = arr[k];
            j = k;
        }
        arr[j] = temp;
    }
}

//This approach uses Reversal Algorithm for Array rotation
//This approach modifies Array in place
// Time - O(N)
// Space - O(1)
// Link - https://www.geeksforgeeks.org/program-for-array-rotation-continued-reversal-algorithm/
const rotateReversal = (arr, d) => {
    if (d >= arr.length) {
        d = d % arr.length;
    }

    if (d === 0) return arr;

    const reverseArray = (a, start, end) => {
        while (start < end) {
            let temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            start++;
            end--;
        }
    }
    reverseArray(arr, 0, d - 1);
    reverseArray(arr, d, arr.length - 1);
    reverseArray(arr, 0, arr.length - 1);

}

/* 
Link: https://www.geeksforgeeks.org/binary-search/
2. Given a sorted array arr[] of n elements, write a function to search a given element x in arr[] and return the index of x in the array.
*/

// Time - O(logN)
// Space - O(1)
//Iterative Approach
const binarySearchIterative = (arr, item) => {
    let low = 0;
    let high = arr.length - 1

    while (low < high) {
        let middleIdx = Math.floor((low + high) / 2);
        if (arr[middleIdx] === item) return middleIdx;
        if (arr[low] === item) return low;
        if (arr[high] === item) return high;

        if (item > arr[middleIdx]) {
            low = middleIdx + 1;
        } else {
            high = middleIdx - 1;
        }
    }

    return -1;
}

//Recursive Approach
const binarySearchRecursive = (arr, item, low = 0, high = arr.length - 1) => {
    if (low > high) return -1;

    let middleIdx = Math.floor((low + high) / 2);
    if (arr[middleIdx] === item) return middleIdx;
    if (arr[low] === item) return low;
    if (arr[high] === item) return high;

    if (item > arr[middleIdx]) {
        return binarySearchRecursive(arr, item, middleIdx + 1, high);
    } else {
        return binarySearchRecursive(arr, low, middleIdx - 1);
    }
}


/* 
Link: https://www.geeksforgeeks.org/search-an-element-in-a-sorted-and-pivoted-array/
3. Given a sorted and rotated array arr[] of size N and a key, the task is to find the key in the array.
   Find the element in O(logN) time and assume that all the elements are DISTINCT.
*/
// Time - O(logN)
// Space - O(1)
const pivotedBinarySearch = (arr, item, low = 0, high = arr.length - 1) => {
    if (low > high) return -1;

    let middle = Math.floor((low + high) / 2);

    if (arr[middle] === item) return middle;

    //left half is sorted
    if (arr[low] <= arr[middle]) {
        //Check if key lies between low and middle, if not check next half for key
        if (item >= arr[low] && item <= arr[middle]) {
            return pivotedBinarySearch(arr, item, low, middle - 1);
        }
        return pivotedBinarySearch(arr, item, middle + 1, high);
    }

    //right half is sorted
    //Check if key lies between middle and high, if not check other half
    if (item >= arr[middle] && item <= arr[high]) {
        return pivotedBinarySearch(arr, item, middle + 1, high);
    }

    return pivotedBinarySearch(arr, item, low, middle - 1);
}

/* 
Link: https://www.geeksforgeeks.org/given-an-array-a-and-a-number-x-check-for-pair-in-a-with-sum-as-x/
4. Given an array A[] and a number x, check for pair in A[] with sum as x (aka Two Sum)
*/

// A simple solution here could be looping through each and every pair with 2 for loops and finding the pair with sum.
// But we will not consider that here. We need a more optimized way.

// Using Hashing
// Time - O(N)
// Space - O(N)
const pairWithSumHashing = (arr, sum) => {
    const set = new Set();
    const result = [];

    for (const element of arr) {
        if (set.has(sum - element)) {
            result.push([element, sum - element]);
        } else {
            set.add(element);
        }
    }

    return result;
}

// Using 2 pointer and sorting
// Time - Depends on sorting Algorithm used
// Space - Depends on sorting Algorithm used
const pairWithSum = (arr, sum) => {
    const result = [];
    arr.sort((a, b) => a - b);

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        if (arr[left] + arr[right] === sum) {
            result.push([arr[left], arr[right]]);
        }

        if (arr[left] + arr[right] < sum) {
            left++;
        } else {
            right--;
        }
    }

    return result;
}

/* 
Link: https://www.geeksforgeeks.org/given-a-sorted-and-rotated-array-find-if-there-is-a-pair-with-a-given-sum/
5. Given an array arr[] of DISTINCT elements size N that is sorted and then around an unknown point, the task is to check if the array has a pair with a given sum X.
*/
// Time - O(N)
// Space - O(1)
const pairWithSumRotated = (arr, sum) => {
    const result = [];
    //Find the pivot point in O(N)
    let pivotIndex = -1;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            pivotIndex = i;
            break;
        }
    }

    let low = pivotIndex + 1;
    let high = pivotIndex;

    while (high !== low) {
        if (low === arr.length) low = 0
        if (high === -1) high = arr.length - 1;

        if (arr[low] + arr[high] === sum) {
            result.push([low, high]);
        }

        if (arr[low] + arr[high] > sum) {
            high--;
        } else {
            low++;
        }
    }

    return result;
}

/* 
Link: https://www.geeksforgeeks.org/find-minimum-element-in-a-sorted-and-rotated-array/
6. Given a sorted array arr[] (may be distinct or may contain duplicates) of size N that is rotated at some unknown point, the task is to find the minimum element in it. 
*/

//This can be done in linear time and space by looping over the entire array and checking for min element.
// But as the array is sorted we can opt for binary Search to solve this in logN time.

// Time - O(logN)
// Space - O(1)
const minElementSortedRotated = (arr) => {

}

/* 
Link: https://www.geeksforgeeks.org/rearrange-array-arri/
7. Given an array of elements of length N, ranging from 0 to N – 1. All elements may not be present in the array. If the element is not present then there will be -1 present in the array. Rearrange the array such that A[i] = i and if i is not present, display -1 at that place.
*/

// Time - O(N)
// Space - O(N)
// Using hash Set
const reArrangeUsingSet = (arr) => {
    //Created new Array for simplicity so that I can view original array and not modify it. Can be removed.
    const A = [...arr];
    const set = new Set(A);
    for (let i = 0; i < A.length; i++) {
        if (set.has(i)) {
            A[i] = i;
        } else {
            A[i] = -1;
        }
    }
    return A;
}

// Time - O(N)
// Space - O(1)
// Using no extra space, optimum solution
const rearrange = (arr) => {
    //Created new Array for simplicity so that I can view original array and not modify it. Can be removed.
    const A = [...arr];

    for (let i = 0; i < A.length; i++) {
        if (A[i] !== -1 && A[i] !== i) {
            let x = A[i];

            //If the next element to replace is not -1 or the correct element, then replace one by one
            while (A[x] !== -1 && A[x] != x) {
                let y = A[x];

                A[x] = x;

                x = y;
            }

            //If the next element to replace is correct or -1, then directly replace
            A[x] = x;
        }

        //If the while loop doesnt find the right value, put -1 there.
        if (A[i] != i) {
            A[i] = -1;
        }
    }

    return A;
}

/* 
Link: https://www.geeksforgeeks.org/move-zeroes-end-array/
8. Given an array of random numbers, Push all the zero’s of a given array to the end of the array.
*/

// Time - O(N)
// Space - O(1)
const moveZerosToEnd = (arr) => {
    let count = 0;

    // Traverse the array. If element encountered is non-
    // zero, then replace the element at index 'count'
    // with this element
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            arr[count++] = arr[i];
        }
    }

    // Now all non-zero elements have been shifted to
    // front and 'count' is set as index of first 0.
    // Make all elements 0 from count to end.
    while (count < arr.length) {
        arr[count++] = 0;
    }
}

//Using 2 Pointer Technique (My implementation not on GFG)
const moveZerosToEndTwoPointer = (arr) => {
    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        if (arr[j] === 0) {
            j--;
            continue;
        }

        if (arr[i] === 0) {
            for (let k = i; k < j; k++) {
                arr[k] = arr[k + 1];
            }
            arr[j] = 0;
            continue;
        }
        i++;
    }
}

/* 
Link: https://www.geeksforgeeks.org/move-negative-numbers-beginning-positive-end-constant-extra-space/
8. An array contains both positive and negative numbers in random order. Rearrange the array elements so that all negative numbers appear before all positive numbers.
*/

//This can also be achieved by sorting the Array

//My implementation not in GFG
const rearrangePositiveNegative = (arr) => {
    let i = 0;
    let j = arr.length - 1;

    while (i < j) {
        if (arr[j] >= 0) {
            j--;
            continue;
        }

        if (arr[i] < 0) {
            i++;
            continue;
        }

        if (arr[i] >= 0) {
            let temp = arr[i];
            for (let k = i; k < j; k++) {
                arr[k] = arr[k + 1];
            }
            arr[j] = temp;
            continue;
        }
        i++;
    }
}

//Using Dutch National Flag Algorithm. Order of Elements are not maintained here.
// Time - O(N)
// Space - O(1)
const rearrangePosNeg = (arr) => {
    let low = 0;
    let high = arr.length - 1;

    while (low < high) {
        if (arr[low] < 0) {
            low++;
        } else if (arr[high] > 0) {
            high--;
        } else {
            let temp = arr[low];
            arr[low] = arr[high];
            arr[high] = temp;
        }
    }
}

/* 
Link: https://www.geeksforgeeks.org/positive-elements-at-even-and-negative-at-odd-positions-relative-order-not-maintained/
9. You have been given an array and you have to make a program to convert that array such that positive elements occur at even numbered places in the array and negative elements occur at odd numbered places in the array. We have to do it in place.There can be unequal number of positive and negative values and the extra values have to left as it is.
*/

// Time - O(N)
// Space - O(1)
const rearrangeElements = (arr) => {
    let i = 0; // To loop over even idx
    let j = 1; // To loop on odd idx

    while (i < arr.length && j < arr.length) {
        if (arr[i] >= 0) {
            i += 2;
            continue;
        }

        if (arr[j] < 0) {
            j += 2;
            continue;
        }

        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

/* 
Link: https://www.geeksforgeeks.org/given-an-array-of-numbers-arrange-the-numbers-to-form-the-biggest-number/
10. Re-Arrange an array of given numbers to form the biggest number 
*/

// Time - O(NlogN)
// Space - O(1)
// Used the language in-built sorting function, try it out without using in-built sorting function
const largestNumber = (arr) => {
    arr.sort((a, b) => {
        let j = a.toString();
        let k = b.toString();

        return (parseInt(k + j) - parseInt(j + k));
    })
}

/* 
Link: https://www.geeksforgeeks.org/find-the-largest-three-elements-in-an-array/
11. Find the largest three distinct elements in an array. Expected time complexity is O(n) and extra space is O(1).
*/

//This can also be done by sorting the array and taking largest three elements in NlogN Time.

// Time - O(N)
// Space - O(1)
const largestThreeElements = (arr) => {
    let first = Number.NEGATIVE_INFINITY;
    let second = Number.NEGATIVE_INFINITY;
    let third = Number.NEGATIVE_INFINITY;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > first) {
            third = second;
            second = first;
            first = arr[i];
        } else if (arr[i] > second && arr[i] != first) {
            third = second;
            second = arr[i];
        } else if (arr[i] > third) {
            third = arr[i];
        }
    }

    return [first, second, third];
}

/* 
Link: https://www.geeksforgeeks.org/kth-smallestlargest-element-unsorted-array/
12. Given an array and a number K where K is smaller than the size of the array. Find the K’th smallest element in the given array. 
    Given that all array elements are distinct.
*/

//TODO: This can also be done using a Heap Data Structure.
//TODO: Can also be done using Quick Select. Need to learn Quick Sorting Algorithm for this.

// Time - O(NlogN)
// Space - O(1)
const kthSmallestElement = (arr, k) => {
    arr.sort((a, b) => a - b);
    return arr[k - 1];
}

/* 
Link: https://www.geeksforgeeks.org/minimum-product-k-integers-array-positive-integers/
13. Given an array of n positive integers. We are required to write a program to print the minimum product of k integers of the given array. 
*/

//In this question, indirectly they have asked us to find the smallest k elements in the Array, as their product only would be the smallest.
// Solution same as above.

/* 
Link: https://www.geeksforgeeks.org/k-th-largest-sum-contiguous-subarray/
14. Given an array of integers. Write a program to find the K-th largest sum of contiguous subarray within the array of numbers that has both negative and positive numbers.
*/

// TODO: Learn Min-Heap Data Structure.
const kthLargestContiguousSum = (arr, k) => {

}


/* Sorting Algorithms*/

//1. Selection Sort Algorithm
// Time - O(N^2)
// Space - O(1)
// Unstable Sorting Algorithm

const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let minIdx = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        //Swap Elements
        [arr[minIdx], arr[i]] = [arr[i], arr[minIdx]];
    }
}

//2. Bubble Sort Algorithm
// Time - O(N^2)
// Space - O(N)
// Stable sorting algorithm

const bubbleSort = (arr) => {
    let swapped;
    for (let i = 0; i < arr.length; i++) {
        swapped = false
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                //Swap Elements
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        //If the inner loop does not swap any element means the array is already sorted, so we can break.
        if (swapped === false) {
            break;
        }
    }
}

//3. Insertion Sort Algorithm
// Time - O(N^2)
// Space - O(1)
// Stable sorting algorithm

const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (arr[j] < arr[j - 1]) {
                [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
            }
        }
    }
}

//4. Merge Sort Algorithm
// Time - O(NlogN)
// Space - O(N)
// Stable sorting algorithm

const merge = (arr, l, m, r) => {
    let i = 0;
    let j = 0;
    let k = l;

    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);
    console.log(L, R);
    while (i < L.length && j < R.length) {
        if (L[i] < R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < L.length) {
        arr[k++] = L[i++];
    }

    while (j < R.length) {
        arr[k++] = R[j++];
    }
}

const mergeSort = (arr, l = 0, r = arr.length - 1) => {
    // Recursively divide the array until one element remains.
    if (l >= r) {
        return;
    }

    let m = Math.floor((l + r) / 2);
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);

    // Merge the divided parts in sorted order.
    merge(arr, l, m, r);
}

//5. Quick Sort Algorithm
// Time - O(NlogN)
// Space - O(N)
// Not Stable by default, but can be made stable

const partition = (arr, lower, upper) => {
    let pivot = arr[lower];
    let start = lower;
    let end = upper;

    while (start < end) {
        while (arr[start] <= pivot) {
            start++;
        }
        while (arr[end] > pivot) {
            end--;
        }
        if (start < end) {
            //Swap
            [arr[start], arr[end]] = [arr[end], arr[start]];
        }
    }
    [arr[lower], arr[end]] = [arr[end], arr[lower]];
    return end;
}

const quickSort = (arr, low = 0, high = arr.length - 1) => {
    if (low < high) {
        let pi = partition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

const array = [10, 7, 8, 9, 1, 5];
mergeSort(array);
log(array);