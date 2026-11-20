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
  randomCompleteID,
  getLastDigit,
  getRndInteger,
  thaiIdRegex,
  getDescription,
} from "genthaiid";

const id = gen();
console.log(id); // 13-digit Thai ID

console.log(verify(id)); // true
console.log(thaiIdRegex.test(id)); // true

console.log(random(3)); // ["...", "...", "..."]
console.log(randomCompleteID("1100")); // "1100XXXXXXXX"
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

### `randomCompleteID(startDigits)`

Generates a random 13-digit Thai ID that starts with the provided digits.

- `startDigits` must be between 4 and 12 digits.
- The first digit must be between `1` and `8` (Thai ID rule).
- Remaining digits are randomly generated.
- Returns a valid 13-digit Thai ID string that always passes `verify()`.
- Returns `undefined` if the input is invalid (fewer than 4 digits, first digit is `0` or `9`, or contains non-digits).

Examples:

```js
randomCompleteID("1100");      // "1100XXXXXXXX7" (random fill)
randomCompleteID("1234567");   // "1234567XXXXX2" (random fill)
randomCompleteID("110");       // undefined (too few digits)
randomCompleteID("9100");      // undefined (first digit must be 1-8)
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

### `getDescription(id)`

Breaks a 13-digit Thai ID into its parts and explains what each part means. Dashes and spaces are ignored. Returns `undefined` if the input is not 13 digits.

```js
getDescription("1-1017-00203-45-0");
// {
//   id: "1101700203450",
//   formatted: "1-1017-00203-45-0",
//   valid: true,
//   personType: { code: "1", th: "คนสัญชาติไทยที่เกิดตั้งแต่วันที่ 1 ม.ค. 2527 ...", en: "Thai national born on or after 1 Jan 1984, ..." },
//   province: { code: "10", th: "กรุงเทพมหานคร", en: "Bangkok" },
//   registrationOffice: "1017", // digits 2-5
//   district: "17",             // digits 4-5
//   group: "00203",             // digits 6-10
//   sequence: "45",             // digits 11-12
//   checkDigit: "0"             // digit 13
// }
```

| Digits | Meaning |
|---|---|
| 1 | Person type (`1`-`8`, `0`; `00` = migrant worker) |
| 2-3 | Province where the number was issued |
| 4-5 | District / khet / municipality |
| 6-10 | Group, or birth certificate book number |
| 11-12 | Sequence within the group, or birth certificate number |
| 13 | Check digit |

`personType` and `province` have `th`/`en` set to `null` when the code is not recognised. `valid` is the result of `verify(id)`.

References: [Wongnai](https://www.wongnai.com/articles/id-number-meaning), [Jobs Worker Service](https://www.jobsworkerservice.com/thai-id-number-checker/).

## TypeScript

The package ships with declarations in `index.d.ts`.

## License

MIT