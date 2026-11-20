/**
 * Matches 13 digits whose first digit is 1-8. Does not check the check digit;
 * use `verify()` for that.
 *
 * @type {RegExp}
 * @example
 * thaiIdRegex.test("1101700203450"); // true
 */
export default /^[1-8]\d{12}$/;