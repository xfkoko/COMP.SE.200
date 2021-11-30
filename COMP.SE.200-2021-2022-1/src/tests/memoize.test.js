import { values } from 'lodash';
import memoize from '../memoize';

function add(a, b) {
    console.log("Add called with ", a, b);
    return a + b;
}

//const adder = memoize(add, (...args) => values(args).join("_"));

describe("mamoize-function tests", () => {
    test("Input an object and expect the result to match the objects values", () => {
        const adder =  memoize(add);
        const a = adder(1,2);
        const b = adder(5,2);
        const c = adder(1,3);
        expect(adder.cache.get(1)).toBe(3);
        expect(adder.cache.get(5)).toBe(7);
    });

    // Tää on aika turha ehkä?
    /*test("Input an object that has different kinds of values (numbers, strings) and expect the result to match the objects values", () => {
        expect(1).toBe(1);
    });*/

    test("Input an ‘non-object’, i.e., string, and expect the result to handle the incorrect input", () => {
        const adder = () =>  memoize("add");
        expect(adder).toThrow(TypeError);
    });
});