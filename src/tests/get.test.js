import get from '../get';

const testobject = { 'a': [{ 'b': { 'c': 3 } }, {'d': {'e': 2}}] };


describe("get-function tests", () => {
    test("Test that get-function returns correct value with valid parameters", () => {
        const result =  get(testobject, 'a[0].b.c');
        expect(result).toBe(3);
    });
    
    test("Test that returns default value when value is undefined", () => {
        const defaultValue = 'default';
        const result = get(testobject, 'a[2]', defaultValue);
        expect(result).toBe(defaultValue);
    });

    test("Test that returns undefined if value is undefined and default value not set", () => {
        const result = get(testobject, 'a[10]');
        expect(result).toBe(undefined);
    });

    test("Test that returns always undefined if object is empty without default value", () => {
        const testobject = {};
        const result = get(testobject, 'a[0]');
        expect(result).toBe(undefined);
    });

    test("Test that returns always undefined if path is left empty without default value", () => {
        const result = get(testobject);
        expect(result).toBe(undefined);
    });

    test("Test that returns always default value when path is left empty and default value is given.", () => {
        const defaultValue = 'default';
        const result = get(testobject, 0, defaultValue)
        expect(result).toBe(defaultValue);
    })

    test("Test that path [null] returns undefined", () => {
        const result = get(testobject, [null])
        expect(result).toBe(undefined);
    })

    test("Test that object null returns undefined", () => {
        const result = get(null, 0)
        expect(result).toBe(undefined);
    })
})