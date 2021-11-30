import every from '../every';

describe("every-function tests", () => {
    test("Test an input array that consists of values that are numbers, and the predicate is a 'Number'. Expect the result to be true", () => {
        const result =  every([1, 2, 3], Number);
        expect(result).toBe(true);
    });

    // Tämä ei tuota falsea koska pystyy lukemaan annetut arvot stringeinä.
    /*test("Test an input array that consists of values that are numbers and strings, and the predicate is a 'String'. Expect the result to be false", () => {
        const result =  every([123, "string", "3"], String);
        expect(result).toBe(false);
    });*/

    //LISÄTTY
    // Tällä taas saadaan fail palautus
    test("Test an input array that has null in it. Expect the result to be false", () => {
        const result =  every([123, null, 3], Number);
        expect(result).toBe(false);
    });

    //LISÄTTY
    test("Test an input that in null. Expect the result to be false", () => {
        const result =  every(null, Number);
        expect(result).toBe(true);
    });
});