import getLastDigit from "./getLastDigit.js";
import getRndInteger from "./getRndInteger.js"

/**
 * Generate a random, valid 13-digit Thai ID.
 *
 * The first digit is 1-8, digits 2-12 are random and digit 13 is the
 * check digit. See `gen2()` for IDs with a real province code.
 *
 * @returns {string} A 13-digit Thai ID that passes `verify()`.
 * @example
 * gen(); // "3459812760438"
 */
export default () => {
    const first12digits = [
        getRndInteger(1, 8)
        , ...Array(11).fill(0).map(() => getRndInteger(0, 9))
    ].join('')
    return `${first12digits}${getLastDigit(first12digits) }`;
};