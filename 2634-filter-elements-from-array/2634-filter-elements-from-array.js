/**
 * @param {number[]} arr
 * @param {Function} fn
 * @return {number[]}
 */
var filter = function(arr, fn) {
     const filteredArr = [];

        // Iterate over each element in the input array
        for (let i = 0; i < arr.length; i++) {
            // Evaluate the condition function with the element and its index
            if (fn(arr[i], i)) {
                // If truthy, append the element to our filtered array
                filteredArr.push(arr[i]);
            }
        }

        return filteredArr;
};