import getLastDigit from "./getLastDigit.js";
import getRndInteger from "./getRndInteger.js";
import { provinces } from "./getDescription.js";

const provinceCodes = Object.keys(provinces);

/**
 * Resolve a province code, Thai name or English name to its 2-digit code.
 *
 * @private
 * @param {string|number} province Code, Thai name, or English name (case-insensitive).
 * @returns {string|undefined} The province code, or `undefined` if not found.
 */
const findProvinceCode = (province) => {
    const key = String(province).trim();
    if (provinces[key]) return key;
    const lower = key.toLowerCase();
    return provinceCodes.find(code =>
        provinces[code][0] === key || provinces[code][1].toLowerCase() === lower
    );
};

/**
 * @private
 * @param {number} n How many digits.
 * @returns {string} `n` random digits.
 */
const randomDigits = (n) => Array.from({ length: n }, () => getRndInteger(0, 9)).join("");

/**
 * Like gen(), but digits 2-3 are always a real province code, so the result
 * gets a meaningful getDescription(). Optionally pin the person type and province.
 *
 * @param {object} [options]
 * @param {string|number} [options.personType] first digit, 1-8 (random if omitted)
 * @param {string} [options.province] province code ("10"), Thai name or English name (random if omitted)
 * @returns {string|undefined} 13-digit ID, or undefined if an option is invalid
 * @example
 * gen2();                                       // "1500XXXXXXXXX"
 * gen2({ personType: 1, province: "Bangkok" }); // "110XXXXXXXXXX"
 * gen2({ personType: 9 });                      // undefined
 */
export default ({ personType, province } = {}) => {
    let first;
    if (personType === undefined || personType === null) {
        first = String(getRndInteger(1, 8));
    } else {
        first = String(personType);
        if (!/^[1-8]$/.test(first)) return undefined;
    }

    let provinceCode;
    if (province === undefined || province === null) {
        provinceCode = provinceCodes[getRndInteger(0, provinceCodes.length - 1)];
    } else {
        provinceCode = findProvinceCode(province);
        if (!provinceCode) return undefined;
    }

    const first12digits = `${first}${provinceCode}${randomDigits(9)}`;
    return `${first12digits}${getLastDigit(first12digits)}`;
};
