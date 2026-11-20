/**
 * Calculate the Thai ID check digit (digit 13) from the first 12 digits.
 *
 * Each digit is multiplied by a weight from 13 down to 2, the products are
 * summed, and the check digit is `(11 - sum % 11) % 10`.
 *
 * @param {string} firsttwelvedigits The first 12 digits of the ID.
 * @returns {number} The check digit, 0-9.
 * @example
 * getLastDigit("110170020345"); // 0
 */
export default (firsttwelvedigits) => {
    return (
        (11 -
            (firsttwelvedigits
                .split("")
                .map((i, idx) => parseInt(i) * (13 - idx))
                .reduce((a, b) => a + b, 0) %
                11)) %
        10
    );
}