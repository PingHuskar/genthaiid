export declare function getRndInteger(min: number, max: number): number;
export declare function getLastDigit(firsttwelvedigits: string): number;
export declare function gen(): string;
export declare function random(snum: number | string): string[];
export declare function verify(id: string, checkfirstdigit?: boolean, checklastdigit?: boolean): boolean;
export declare function completeid(strid: string, checkfirstdigit?: boolean, checklastdigit?: boolean): string[] | undefined;
export declare function randomCompleteID(startDigits: string | number): string | undefined;
export declare const thaiIdRegex: RegExp;

export interface ThaiIdLabel<C extends string = string> {
  code: C;
  th: string | null;
  en: string | null;
}

export interface ThaiIdDescription {
  /** The 13 digits with dashes/spaces removed */
  id: string;
  /** X-XXXX-XXXXX-XX-X */
  formatted: string;
  /** Result of verify(id) */
  valid: boolean;
  /** Digit 1 ("00" for migrant workers) */
  personType: ThaiIdLabel;
  /** Digits 2-3 */
  province: ThaiIdLabel;
  /** Digits 2-5: registration office code */
  registrationOffice: string;
  /** Digits 4-5: district / khet / municipality */
  district: string;
  /** Digits 6-10: group or birth certificate book number */
  group: string;
  /** Digits 11-12: sequence within the group */
  sequence: string;
  /** Digit 13 */
  checkDigit: string;
}

export declare function getDescription(id: string | number): ThaiIdDescription | undefined;

export default gen;