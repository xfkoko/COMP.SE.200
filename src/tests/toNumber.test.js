import toNumber from '../toNumber';

describe("toNumber-function tests", () => {
    test("Test a string number and expect the output to have a type of 'number'", () => {
        const result = toNumber("1");
        expect(result).toBe(1);
        expect(typeof result).toBe("number");
    });

    test("Test a negative number which is a string and expect the output to have a type of 'number'", () => {
        const result = toNumber("-1");
        expect(result).toBe(-1);
        expect(typeof result).toBe("number");
    });

    test("Input a float and expect the result to have a type of 'number'", () => {
        const result = toNumber("1.1");
        expect(result).toBe(1.1);
        expect(typeof result).toBe("number");
    });

    test("Input an undesired value, i.e., a string that doesn’t consist of only numbers and expect that the output value is NaN", () => {
        const result = toNumber("1.a");
        expect(result).toBe(NaN);
    });

    test("Input number, expect same number as return", () => {
        const result = toNumber(1);
        expect(result).toBe(1);
    });

    test("Input symbol, expect NaN as return", () => {
        const result = toNumber(Symbol("foo"));
        expect(result).toBe(NaN);
    });

    test("Input function object, expect NaN as return", () => {
        const result = toNumber({a: "1"});
        expect(result).toBe(NaN);
    });

    test("Input object, expect 0 as return", () => {
        const result = toNumber(Object(""));
        expect(result).toBe(0);
    });

    test("Input true, expect 1 as return", () => {
        const result = toNumber(true);
        expect(result).toBe(1);
    });

    test("Input false, expect 0 as return", () => {
        const result = toNumber(false);
        expect(result).toBe(0);
    });
});