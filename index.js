const op = require("operation-strint");

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
  const sum1 =
    gen13 * 13 +
    gen12 * 12 +
    gen11 * 11 +
    gen10 * 10 +
    gen9 * 9 +
    gen8 * 8 +
    gen7 * 7 +
    gen6 * 6 +
    gen5 * 5 +
    gen4 * 4 +
    gen3 * 3 +
    gen2 * 2;
  const mod11sum1 = sum1 % 11;
  const gen1 = (11 - mod11sum1) % 10;
  return `${gen13}${gen12}${gen11}${gen10}${gen9}${gen8}${gen7}${gen6}${gen5}${gen4}${gen3}${gen2}${gen1}`;
};
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
      if (!op.snumpat.test(snum)) return gen();
      while (snum != "0") {
        retArr.push(gen());
        snum = op.minus(snum, `1`);
      }
      return retArr;
    default:
      return gen();
  }
};

const verify = (strid, checkfirstdigit = true, checklastdigit = true) => {
    if (!strid || !/\d{13}/.test(strid)) return false
    if (checkfirstdigit && !/[1-8]\d{12}/.test(strid)) return false
    if (checklastdigit) {
        return (11 -
            (strid
              .slice(0, 12)
              .split("")
              .map((i, idx) => parseInt(i) * (13 - idx))
              .reduce((a, b) => a + b, 0) %
              11)) %
            10 ===
          parseInt(strid.slice(-1));
    }
    return true
}

module.exports = {
  getRndInteger,
  gen,
  random,
  verify
};
