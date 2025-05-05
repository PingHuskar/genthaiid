import { snumpat, minus } from "operation-strint";
import gen from "./gen"
const random = (snum) => {
    const typesnum = typeof snum;
    const retArr = [];
    switch (typesnum) {
        case `number`:
            while (snum > 0) {
                retArr.push(gen());
                snum--;
            }
            return retArr;
        case `string`:
            if (!snumpat.test(snum)) return gen();
            while (snum != "0") {
                retArr.push(gen());
                snum = minus(snum, `1`);
            }
            return retArr;
        default:
            return gen();
    }
};
export default random;