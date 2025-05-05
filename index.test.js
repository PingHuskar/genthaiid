import gen, { getLastDigit, getRndInteger } from ".";
test(`getLastDigit`, () => {
    expect(getLastDigit(`294479707808`)).toBe(0);
    expect(getLastDigit(`104367370319`)).toBe(4);
    expect(getLastDigit(`753193569256`)).toBe(1);
    expect(getLastDigit(`387346213174`)).toBe(2);
})
test("gen length", () => {
    const x = 1000;
    const results = Array.from({ length: x }, () => gen());
    results.forEach(result => {
        expect(result).toHaveLength(13);
    });
})
test("getRndInteger length", () => {
    const x = 100;
    const [min, max] = [0,9]
    const results = Array.from({ length: x }, () => getRndInteger(min, max));
    results.forEach(result => {
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });
})