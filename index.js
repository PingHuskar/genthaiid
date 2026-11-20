/**
 * genthaiid: generate, validate, complete and describe Thai national ID numbers.
 *
 * @module genthaiid
 */
import { getRndInteger, getLastDigit, gen, random, verify, completeid, randomCompleteID, thaiIdRegex, getDescription, gen2 } from "./src/index.js"

export default gen;
export {
  getRndInteger,
  getLastDigit,
  gen,
  random,
  verify,
  completeid,
  randomCompleteID,
  thaiIdRegex,
  getDescription,
  gen2,
};
