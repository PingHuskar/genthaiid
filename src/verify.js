import getLastDigit from "./getLastDigit";
import thaiIdRegex from "./thaiIdRegex"

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