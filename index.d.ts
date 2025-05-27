export declare function getRndInteger(min: number, max: number): number;
export declare function getLastDigit(firsttwelvedigits: string): number;
export declare function gen(): string;
export declare function random(snum: number | string): string[];
export declare function verify(id: string): boolean;
export declare function completeid(strid: string, checkfirstdigit?: boolean, checklastdigit?: boolean): string[] | undefined;
export declare const thaiIdRegex: RegExp;

export default gen;