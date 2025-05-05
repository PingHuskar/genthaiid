import getLastDigit from "./getLastDigit";
import getRndInteger from "./getRndInteger"
const gen = () => {
    const gen13 = Math.floor(Math.random() * (8 - 1 + 1)) + 1;
    const gen12 = getRndInteger(0, 9);
    const gen11 = getRndInteger(0, 9);
    const gen10 = getRndInteger(0, 9);
    const gen9 = getRndInteger(0, 9);
    const gen8 = getRndInteger(0, 9);
    const gen7 = getRndInteger(0, 9);
    const gen6 = getRndInteger(0, 9);
    const gen5 = getRndInteger(0, 9);
    const gen4 = getRndInteger(0, 9);
    const gen3 = getRndInteger(0, 9);
    const gen2 = getRndInteger(0, 9);
    const first12digits = `${gen13}${gen12}${gen11}${gen10}${gen9}${gen8}${gen7}${gen6}${gen5}${gen4}${gen3}${gen2}`;
    const gen1 = getLastDigit(first12digits);
    return `${first12digits}${gen1}`;
};
export default gen;