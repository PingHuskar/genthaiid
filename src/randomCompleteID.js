import getRndInteger from "./getRndInteger";
import getLastDigit from "./getLastDigit";

export default (startDigits) => {
    const prefix = `${startDigits ?? ``}`;

    // First digit must follow Thai ID constraints and input must provide at least 4 starting digits.
    if (!/^[1-8]\d{3,11}$/.test(prefix)) return undefined;

    const remainLength = 12 - prefix.length;
    const randomRemain = Array(remainLength).fill(0).map(() => getRndInteger(0, 9)).join("");
    const first12digits = `${prefix}${randomRemain}`;

    return `${first12digits}${getLastDigit(first12digits)}`;
};