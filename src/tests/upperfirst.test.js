import upperFirst from '../upperFirst';

describe("upperFirst-function tests", () => {
    test("Test that returns capitalized string when given string with all lower-case letters.", () => {
        const input = "foobar";
        const result = upperFirst(input);
        expect(result).toBe("Foobar");
    });

    test("Test that returns given string if the first letter is already capitalized.", () => {
        const input = "FOOBAR";
        const result = upperFirst(input);
        expect(result).toBe(input);
    });

    // TypeErrorin tilalla toimii myös pelkkä Error
    test("Test that throws TypeError if given parameter is not string.", () => {
        const input = 123;
        const result = () => upperFirst(input);
        expect(result).toThrow(TypeError);
    });

    test("Test that returns the given string as it is if the first character is a symbol", () => {
        const input = "1foobar";
        const result = upperFirst(input);
        expect(result).toBe(input);
    })
})