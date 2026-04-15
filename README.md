# genthaiid

Generate, validate, and complete Thai national ID numbers in JavaScript.

The package is ESM-only and exports the generator as the default export.

## Installation

```bash
npm install genthaiid
```

## Usage

```js
import gen, {
  random,
  verify,
  completeid,
  getLastDigit,
  getRndInteger,
  thaiIdRegex,
} from "genthaiid";

const id = gen();
console.log(id); // 13-digit Thai ID

console.log(verify(id)); // true
console.log(thaiIdRegex.test(id)); // true

console.log(random(3)); // ["...", "...", "..."]
console.log(getLastDigit("110170020345")); // checksum digit
console.log(getRndInteger(0, 9)); // random integer between 0 and 9

console.log(completeid("11017002034_5"));
// returns every matching ID that fits the placeholder
```

## API

### `gen()`

Returns a random 13-digit Thai ID number as a string.

### `random(count)`

Returns an array of generated Thai ID numbers.

- If `count` is a number, it uses `parseInt(count)`.
- If `count` is a numeric string, it decrements the string safely and generates that many IDs.
- If `count` is invalid, omitted, or not numeric, it returns an array with one generated ID.

Examples:

```js
random(2);     // ["...", "..."]
random("2");  // ["...", "..."]
random(null);  // ["..."]
```

### `verify(id, checkfirstdigit = true, checklastdigit = true)`

Checks whether a value is a valid Thai ID.

- Requires exactly 13 digits.
- By default, validates both the first digit rule and the checksum digit.
- `checkfirstdigit` enforces the first digit to be between `1` and `8`.
- `checklastdigit` enforces the calculated checksum.

### `completeid(idWithPlaceholders, checkfirstdigit = true, checklastdigit = true)`

Completes a partial 13-digit Thai ID using `_` as a placeholder and returns every valid match.

Examples:

```js
completeid("11017002034_5");
completeid("1____________");
```

Returns:

- `string[]` when multiple candidates are checked and valid matches are found
- `string` when the original input is already valid
- `undefined` when the input is not a 13-digit pattern

### `getLastDigit(firstTwelveDigits)`

Calculates the checksum digit from the first 12 digits of a Thai ID.

### `getRndInteger(min, max)`

Returns a random integer between `min` and `max`, inclusive.

### `thaiIdRegex`

Regular expression for the first-digit rule:

```js
/^[1-8]\d{12}$/
```

## TypeScript

The package ships with declarations in `index.d.ts`.

## License

MIT