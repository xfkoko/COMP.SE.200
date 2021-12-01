import words from '../words';

describe("words-function tests", () => {
    test("Input a normal desired string that separates its words with a comma. Expect the output to be an array of the given words", () => {
        const result = words("Bob, Alice, James");
        expect(result).toStrictEqual(["Bob", "Alice", "James"]);
    });

    test("Input a string that separates its words with only a space. Expect the output to be an array of given words", () => {
        const result = words("Bob Alice James");
        expect(result).toStrictEqual(["Bob", "Alice", "James"]);
    });

    test("Input a string and a regular expression and expect the output to match the regex", () => {
        const result = words("Bob, Alice & James", /[^, ]+/g);
        expect(result).toStrictEqual(["Bob", "Alice", "&", "James"]);
    });

    test("Input a faulty regex and see that the return value is an empty array", () => {
        const result = words("Bob, Alice & James", "faulty");
        expect(result).toStrictEqual([]);
    });

    test("Should throw TypeError when undefined is set as a string input", () => {
        const result = () => words(undefined);
        expect(result).toThrow(TypeError);
    });

    test("Input ',' as a string and expect to return empty list", () => {
        const result = words(",");
        expect(result).toStrictEqual([]);
    });
});