import { snumpat, minus } from "operation-strint";
import gen from "./gen.js"
/**
 * Generate several random Thai IDs with `gen()`.
 *
 * @param {number|string} snum How many IDs to generate. A number is truncated
 *   with `parseInt`. A numeric string is counted down with string arithmetic
 *   (and logs a warning). Anything else, or a non-numeric string, yields one ID.
 * @returns {string[]} The generated IDs.
 * @example
 * random(3);    // ["...", "...", "..."]
 * random("2");  // ["...", "..."]
 * random(null); // ["..."]
 */
export default (snum) => {
    const typesnum = typeof snum;
    const retArr = [];
    switch (typesnum) {
        case `number`:
            return new Array(parseInt(snum)).fill(0).map(() => gen());
        case `string`:
            console.warn(`Consider Use Number as Input`)
            if (!snumpat.test(snum)) return [gen()];
            while (snum != "0") {
                retArr.push(gen());
                snum = minus(snum, `1`);
            }
            return retArr;
        default:
            return [gen()];
    }
};