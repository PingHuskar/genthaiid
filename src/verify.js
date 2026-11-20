import getLastDigit from "./getLastDigit.js";
import thaiIdRegex from "./thaiIdRegex.js"

/**
 * Check whether a value is a valid Thai ID.
 *
 * @param {string} strid The ID to check (13 digits).
 * @param {boolean} [checkfirstdigit=true] Require the first digit to be 1-8.
 * @param {boolean} [checklastdigit=true] Require digit 13 to match the check digit.
 * @returns {boolean} `true` if the ID passes every enabled check.
 * @example
 * verify("1101700203450");               // true
 * verify("1101700203451");               // false (bad check digit)
 * verify("1101700203451", true, false);  // true
 */
export default (strid, checkfirstdigit = true, checklastdigit = true) => {
    if (!strid || !/\d{13}/.test(strid)) return false
    if (checkfirstdigit && !thaiIdRegex.test(strid)) return false
    if (checklastdigit) {
        return getLastDigit
            (strid
                .slice(0, 12)
            ) ===
            parseInt(strid.slice(-1));
    }
    return true
}