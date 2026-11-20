import getRndInteger from "./getRndInteger.js";
import getLastDigit from "./getLastDigit.js";

/**
 * Generate a random valid Thai ID that starts with the given digits.
 *
 * @param {string|number} startDigits 4-12 leading digits; the first must be 1-8.
 * @returns {string|undefined} A 13-digit ID that passes `verify()`, or
 *   `undefined` if `startDigits` is invalid.
 * @example
 * randomCompleteID("1100"); // "1100XXXXXXXXX"
 * randomCompleteID("110");  // undefined (too few digits)
 * randomCompleteID("9100"); // undefined (first digit must be 1-8)
 */
export default (startDigits) => {
    const prefix = `${startDigits ?? ``}`;

    // First digit must follow Thai ID constraints and input must provide at least 4 starting digits.
    if (!/^[1-8]\d{3,11}$/.test(prefix)) return undefined;

    const remainLength = 12 - prefix.length;
    const randomRemain = Array(remainLength).fill(0).map(() => getRndInteger(0, 9)).join("");
    const first12digits = `${prefix}${randomRemain}`;

    return `${first12digits}${getLastDigit(first12digits)}`;
};