/**
 * Random integer between `min` and `max`, inclusive.
 *
 * @param {number} min Lower bound (inclusive).
 * @param {number} max Upper bound (inclusive).
 * @returns {number} A random integer in `[min, max]`.
 * @example
 * getRndInteger(0, 9); // 7
 */
export default (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;