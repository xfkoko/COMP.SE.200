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
        const c = adder(1,2);
        expect(a).toBe(3);
        expect(b).toBe(7);
        expect(c).toBe(a);
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