import filter from '../filter'

const testobject = [
    {
        "name": "james",
        "age": 14
    },
    {
        "name": "jessie",
        "age": 25
    },
    {
        "name": "pentti",
        "age": 50
    }
]

describe("filter-function tests", () => {
    test("Test that filters arrays", () => {
        const result = filter(testobject, ({age}) => age > 15);
        const expected = [
            { 
                "name": "jessie",
                "age": 25
            },
            { 
                "name": "pentti",
                "age": 50
            }
        ];
        expect(result).toMatchObject(expected);
    });

    test("Test that filters strings", () => {
        const result = filter(testobject, ({name}) => name == "pentti");
        const expected =[
            {
                "name": "pentti",
                "age": 50
            }
        ];
        expect(result).toMatchObject(expected);
    });

    test("Test that returns empty if given null as array", () => {
        const result = filter(null, (({foo}) => foo));
        expect(result).toMatchObject([[]])
    });

    test("Test that returns empty if given array is not iterable", () => {
        const result = filter(testobject, (({foo}) => foo));
        const expected = [[]];
        expect(result).toMatchObject(expected);
    });
})