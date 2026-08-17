/**
 * @param {number[]} stoneValue
 * @return {number}
 */
var stoneGameV = function(stoneValue) {
    const n = stoneValue.length;

    if (n === 1) return 0;

    // Prefix sums
    const prefix = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + stoneValue[i];
    }

    // Get sum from index left to right
    const getSum = (left, right) => {
        return prefix[right + 1] - prefix[left];
    };

    // dp[i][j] = maximum score Alice can get
    // using stones from i to j
    const dp = Array.from(
        { length: n },
        () => new Array(n).fill(0)
    );

    // length = size of current subarray
    for (let length = 2; length <= n; length++) {

        for (let left = 0; left + length <= n; left++) {

            const right = left + length - 1;

            for (let split = left; split < right; split++) {

                const leftSum = getSum(left, split);
                const rightSum = getSum(split + 1, right);

                if (leftSum < rightSum) {
                    // Bob removes right side
                    dp[left][right] = Math.max(
                        dp[left][right],
                        leftSum + dp[left][split]
                    );

                } else if (leftSum > rightSum) {
                    // Bob removes left side
                    dp[left][right] = Math.max(
                        dp[left][right],
                        rightSum + dp[split + 1][right]
                    );

                } else {
                    // Equal sums:
                    // Alice can choose which side remains
                    dp[left][right] = Math.max(
                        dp[left][right],
                        leftSum + Math.max(
                            dp[left][split],
                            dp[split + 1][right]
                        )
                    );
                }
            }
        }
    }

    return dp[0][n - 1];
};