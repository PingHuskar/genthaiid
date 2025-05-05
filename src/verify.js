import getLastDigit from "./getLastDigit";
const verify = (strid, checkfirstdigit = true, checklastdigit = true) => {
    if (!strid || !/\d{13}/.test(strid)) return false
    if (checkfirstdigit && !/[1-8]\d{12}/.test(strid)) return false
    if (checklastdigit) {
        return getLastDigit
            (strid
                .slice(0, 12)
            ) ===
            parseInt(strid.slice(-1));
    }
    return true
}
export default verify;