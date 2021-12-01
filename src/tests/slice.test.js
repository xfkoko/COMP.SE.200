import slice from '../slice';

const defaultList = [1,2,3,4,5];

describe("slice-function tests", () => {
    test("Test that when given start value of 0 and no end value returns array as it is", () => {
        const result = slice(defaultList, 0);
        expect(result).toStrictEqual(defaultList);
    })

    test("Test that when given only start value removes given number of objects from the beginning of the array", () => {
        const result = slice(defaultList, 1);
        expect(result).toStrictEqual([2,3,4,5]);
    })

    test("Test that when given empty array to be sliced returns empty array", () => {
        const result = slice([], 1, 1);
        expect(result).toStrictEqual([]);
    })

    test("Test that when given start and end values the function returns the desired objects", () => {
        const result = slice([1,2,3,4,5], 0, 2);
        expect(result).toStrictEqual([1,2]);
    })

    test("Test that returns undefined when index goes over array", () => {
        const result = slice([1,2,3,4,5], 6, 8);
        expect(result).toStrictEqual([undefined, undefined]);
    })

    test("Test that negative end parameter gives desired end result", () => {
        const result = slice([1,2,3,4,5], 1, -1);
        expect(result).toStrictEqual([2,3,4]);
    });

    test("Test that negative start parameter gives desired end result", () => {
        const result = slice([1,2,3,4,5], -3, -1);
        expect(result).toStrictEqual([3,4]);
    });

    test("Test that null array parameter gives empty as a return", () => {
        const result = slice(null, 0);
        expect(result).toStrictEqual([]);
    });

    test("Test that null start parameter acts same as 0", () => {
        const result1 = slice(defaultList, 0);
        const result2 = slice(defaultList, null)
        expect(result1).toStrictEqual(result2);
    });

    test("Test that negative start parameter acts as a 0 when its absolute value is larger than length of the array", () => {
        const result = slice([1,2,3], -4);
        expect(result).toStrictEqual([1,2,3]);
    });

    test("Test that when start > end returns empty", () => {
        const result = slice(defaultList, 3, 2);
        expect(result).toStrictEqual([]);
    });
})