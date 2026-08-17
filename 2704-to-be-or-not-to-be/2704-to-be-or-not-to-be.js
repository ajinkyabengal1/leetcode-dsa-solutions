/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
        return {
            toBe: function(expectedVal) {
                if (val === expectedVal) {
                    return true;
                } else {
                    throw new Error("Not Equal");
                }
            },
            notToBe: function(expectedVal) {
                if (val !== expectedVal) {
                    return true;
                } else {
                    throw new Error("Equal");
                }
            }
        };
    };

