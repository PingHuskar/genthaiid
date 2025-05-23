import verify from "./verify";
import { sum } from "operation-strint";
export default (strid, checkfirstdigit = true, checklastdigit = true) => {
    if (!strid || !/\d{13}/.test(strid)) return undefined
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
        i = sum(i, `1`)
        if (i.length > countBlank) break
    }
    return retArray;
}