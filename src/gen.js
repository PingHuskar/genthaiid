import getLastDigit from "./getLastDigit";
import getRndInteger from "./getRndInteger"

export default () => {
    const first12digits = [
        getRndInteger(1, 8)
        , ...Array(11).fill(0).map(() => getRndInteger(0, 9))
    ].join('')
    return `${first12digits}${getLastDigit(first12digits) }`;
};