const op = require("operation-strint");

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getLastDigit = (firsttwelvedigits) => {
  return (
    (11 -
      (firsttwelvedigits
        .split("")
        .map((i, idx) => parseInt(i) * (13 - idx))
        .reduce((a, b) => a + b, 0) %
        11)) %
    10
  );
}

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
        return getLastDigit
            (strid
              .slice(0, 12)
             ) ===
          parseInt(strid.slice(-1));
    }
    return true
}

const compeleteid = (strid, checkfirstdigit = true, checklastdigit = true) => {
  if (!strid || !/.{13}/.test(strid)) return null
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
    i = op.sum(i, `1`)
    if (i.length > countBlank) break
  }
  return retArray;
}

module.exports = {
  getRndInteger,
  getLastDigit,
  gen,
  random,
  verify,
  compeleteid
};
