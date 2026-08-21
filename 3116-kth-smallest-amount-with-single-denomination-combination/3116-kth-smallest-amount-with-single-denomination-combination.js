/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function(coins, k) {
     const n = coins.length;

        // Helper to calculate Greatest Common Divisor
        function gcd(a, b) {
            while (b !== 0n) {
                let temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }

        // Helper to calculate Least Common Multiple
        function lcm(a, b) {
            return (a / gcd(a, b)) * b;
        }

        // Precompute (LCM, sign) for all non-empty subsets (Inclusion-Exclusion Principle)
        const subsets = [];
        const totalSubsets = 1 << n;

        for (let mask = 1; mask < totalSubsets; mask++) {
            let curLcm = 1n;
            let bits = 0;

            for (let i = 0; i < n; i++) {
                if ((mask >> i) & 1) {
                    curLcm = lcm(curLcm, BigInt(coins[i]));
                    bits++;
                }
            }

            // Odd size -> +1, Even size -> -1
            const sign = (bits % 2 === 1) ? 1n : -1n;
            subsets.push([curLcm, sign]);
        }

        // Count how many multiples are <= m
        function count(m) {
            let total = 0n;
            for (let i = 0; i < subsets.length; i++) {
                const [lcmVal, sign] = subsets[i];
                total += sign * (m / lcmVal);
            }
            return total;
        }

        // Binary search
        const minCoin = BigInt(Math.min(...coins));
        const targetK = BigInt(k);

        let low = 1n;
        let high = minCoin * targetK;
        let ans = high;

        while (low <= high) {
            const mid = (low + high) / 2n;
            if (count(mid) >= targetK) {
                ans = mid;
                high = mid - 1n; 
            } else {
                low = mid + 1n;
            }
        }

        return Number(ans);
};