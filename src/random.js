import { snumpat, minus } from "operation-strint";
import gen from "./gen"
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