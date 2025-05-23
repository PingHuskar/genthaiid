import getLastDigit from "./getLastDigit";
import getRndInteger from "./getRndInteger"
export default () => {
    const digits = [getRndInteger(1, 8)];
    for (let i = 0; i < 11; i++) {
        digits.push(getRndInteger(0, 9));
    }
    const first12digits = digits.join('');
    const gen1 = getLastDigit(first12digits);
    return `${first12digits}${gen1}`;
};