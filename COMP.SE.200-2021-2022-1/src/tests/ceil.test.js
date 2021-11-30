import ceil from '../ceil';

describe("ceil-function tests", () => {
    test("Test a float number and expect the result to be rounded up to an integer", () => {
        const result = ceil(1.11);
        expect(result).toBe(2);
    });

    test("Test a float number that has 3 decimals and set the round up precision to be 2. Expect the result to be a rounded up 2 decimal number", () => {
        const result = ceil(1.111, 2);
        expect(result).toBe(1.12);
    });

    test("Test a number that is larger than hundred and set the round up precision -2. Expect the result to be rounded up by hundreds", () => {
        const result = ceil(1234, -2);
        expect(result).toBe(1300);
    });

    // Ei ehkä tarvita (toinen testi kattaa)
    test("Test any number and set the round up precision to be true. Expect same result as when round up precision would be 1", () => {
        const result = ceil(1.11, true);
        expect(result).toBe(1.2);
    });

    test("Test any number and set the round up precision to be anything faulty. Expect the result to be same as without the round up precision", () => {
        const result = ceil(1.11, "test");
        expect(result).toBe(2);
    });
});