/**
 * @param {number} n
 * @param {number[][]} reservedSeats
 * @return {number}
 */
var maxNumberOfFamilies = function(n, reservedSeats) {
    const reservedRows = new Map();

    for (const [row,seat] of reservedSeats){
        if (seat >= 2 && seat <= 9){
            const currentMask = reservedRows.get(row) || 0;

            reservedRows.set(row,currentMask | (1 << (seat -2)))
        }
    }

    const LEFT_MASK = 15;   // 0b00001111
        const RIGHT_MASK = 240; // 0b11110000
        const MID_MASK = 60;    // 0b00111100

        let totalGroups = (n - reservedRows.size) * 2; // Empty rows fit 2 groups each

        for (const mask of reservedRows.values()) {
            const canLeft = (mask & LEFT_MASK) === 0;
            const canRight = (mask & RIGHT_MASK) === 0;
            const canMid = (mask & MID_MASK) === 0;

            if (canLeft && canRight) {
                totalGroups += 2;
            } else if (canLeft || canRight || canMid) {
                totalGroups += 1;
            }
        }

        return totalGroups;
};