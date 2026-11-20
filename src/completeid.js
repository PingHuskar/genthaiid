import verify from "./verify.js";
import { sum } from "operation-strint";
/**
 * Fill `_` placeholders in a partial Thai ID and return every valid result.
 *
 * Tries every digit combination for the placeholders, so each `_` multiplies
 * the work by 10.
 *
 * @param {string} strid A 13-character ID using `_` for unknown digits.
 * @param {boolean} [checkfirstdigit=true] Passed to `verify()`: require first digit 1-8.
 * @param {boolean} [checklastdigit=true] Passed to `verify()`: require a valid check digit.
 * @returns {string[]|string|undefined} The matching IDs; the input itself if it is
 *   already valid; or `undefined` if the input is not a 13-digit pattern.
 * @example
 * completeid("11017002034_5");
 */
export default (strid, checkfirstdigit = true, checklastdigit = true) => {
    if (!strid || !/^[\d_]{13}$/.test(strid)) return undefined
    if (verify(strid)) return strid;
    const retArray = []
    const countBlank = (strid.match(/_/g) || []).length;
    let i = `0`.repeat(countBlank);
    while (true) {
        let replaced = strid;
        for (let j = 0; j < countBlank; j++) {
            replaced = replaced.replace(`_`, `${i.slice(j, j + 1)}`);
        }
        if (verify(replaced, checkfirstdigit, checklastdigit)) retArray.push(replaced)
        if (countBlank === 0) break
        i = sum(i, `1`).padStart(countBlank, `0`)
        if (i.length > countBlank) break
    }
    return retArray;
}