import gen, { random, getLastDigit, getRndInteger, thaiIdRegex, verify, randomCompleteID, getDescription, gen2, completeid } from "./index.js";

test("random", () => {
    expect(random(50)).toHaveLength(50);
    expect(random(50.99)).toHaveLength(50);
    expect(random(0.99)).toHaveLength(0);
    expect(random(`50`)).toHaveLength(50);
    expect(random(`0050`)).toHaveLength(50);
    expect(random(`-0050`)).toHaveLength(1);
    expect(random(`0`)).toHaveLength(0);
    expect(random(null)).toHaveLength(1);
    expect(random(undefined)).toHaveLength(1);
})

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
        expect(result).toMatch(thaiIdRegex);
    });
})

test("getRndInteger length", () => {
    const x = 100;
    const [min, max] = [0, 9]
    const results = Array.from({ length: x }, () => getRndInteger(min, max));
    results.forEach(result => {
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
    });
})

test("randomCompleteID generates valid Thai IDs", () => {
    const x = 1000;
    const results = Array.from({ length: x }, () => randomCompleteID("1100"));

    results.forEach(result => {
        expect(result).toHaveLength(13);
        expect(verify(result, true, true)).toBe(true);
    });
})

test("randomCompleteID requires at least 4 starting digits", () => {
    expect(randomCompleteID("110")).toBeUndefined();
    expect(randomCompleteID("abcd")).toBeUndefined();
    expect(randomCompleteID("9100")).toBeUndefined();
})
test("getDescription", () => {
    const d = getDescription("1-1017-00203-45-0");
    expect(d.id).toBe("1101700203450");
    expect(d.formatted).toBe("1-1017-00203-45-0");
    expect(d.valid).toBe(true);
    expect(d.personType.code).toBe("1");
    expect(d.province).toEqual({ code: "10", th: "กรุงเทพมหานคร", en: "Bangkok" });
    expect(d.registrationOffice).toBe("1017");
    expect(d.district).toBe("17");
    expect(d.group).toBe("00203");
    expect(d.sequence).toBe("45");
    expect(d.checkDigit).toBe("0");

    expect(getDescription("3500100000000").province.en).toBe("Chiang Mai");
    expect(getDescription("0012345678901").personType.code).toBe("00");
    expect(getDescription("0123456789012").personType.code).toBe("0");
    expect(getDescription("9999999999999").personType.th).toBeNull();
    expect(getDescription("1990000000000").province.en).toBeNull();

    expect(getDescription("123")).toBeUndefined();
    expect(getDescription(null)).toBeUndefined();
    expect(getDescription("abcdefghijklm")).toBeUndefined();

    for (let i = 0; i < 100; i++) {
        expect(getDescription(gen()).valid).toBe(true);
    }
})

test("gen2", () => {
    for (let i = 0; i < 1000; i++) {
        const id = gen2();
        expect(id).toMatch(thaiIdRegex);
        expect(verify(id)).toBe(true);
        expect(getDescription(id).province.en).not.toBeNull();
    }

    expect(gen2({ personType: 3 })[0]).toBe("3");
    expect(gen2({ personType: "8" })[0]).toBe("8");
    expect(gen2({ province: "10" }).slice(1, 3)).toBe("10");
    expect(gen2({ province: "chiang mai" }).slice(1, 3)).toBe("50");
    expect(gen2({ province: "ภูเก็ต" }).slice(1, 3)).toBe("83");

    const d = getDescription(gen2({ personType: 1, province: "Bangkok" }));
    expect(d.valid).toBe(true);
    expect(d.personType.code).toBe("1");
    expect(d.province.en).toBe("Bangkok");

    expect(gen2({ personType: 0 })).toBeUndefined();
    expect(gen2({ personType: 9 })).toBeUndefined();
    expect(gen2({ personType: "12" })).toBeUndefined();
    expect(gen2({ province: "99" })).toBeUndefined();
    expect(gen2({ province: "Atlantis" })).toBeUndefined();
})

test("completeid", () => {
    expect(completeid("11017002034_5")).toEqual(["1101700203425"]);
    expect(verify("1101700203425")).toBe(true);
    expect(completeid("110170020345_")).toEqual(["1101700203450"]);
    expect(completeid("1101700203450")).toBe("1101700203450");
    expect(completeid("1101700203451")).toEqual([]);

    const two = completeid("11017002034__");
    expect(two).toHaveLength(10);
    two.forEach(id => expect(verify(id)).toBe(true));

    expect(completeid("_101700203450")).toEqual(
        completeid("_101700203450", false).filter(id => /^[1-8]/.test(id))
    );

    expect(completeid("110170020345")).toBeUndefined();
    expect(completeid("11017002034_50")).toBeUndefined();
    expect(completeid("1101700203a45")).toBeUndefined();
    expect(completeid("")).toBeUndefined();
    expect(completeid(undefined)).toBeUndefined();
})
