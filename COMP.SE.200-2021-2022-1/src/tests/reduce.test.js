import reduce from '../reduce';

function categoryIteratee(color) {
    function iteratee(result, value, key) {
        if (value.color == color) {
            (result["wanted"] || (result["wanted"] = [])).push(key);
        };
        return result;
    };
    return iteratee;
};

function rangeIteratee(int) {
    function iteratee(result, value, key){
        if (value.val > int) {
            (result["wanted"] || (result["wanted"] = [])).push(key);
        };
        return result;
    };
    return iteratee;
};

const sumIteratee = (sum, n) => sum + n;

const invalidItaratee = (result, value, key) => {
    (result[value] || (result[value] = [])).push(key)
    return result
}

const collection = {'a': {val: 1, color: "blue"}, 'b': {val: 2, color: "black"}, 'c': {val: 1, color: "black"}, 'd': {val: 2, color: "white"}};

describe("reduce-function tests", () => {
    test("Test that sorting works with categories", () => {
        const colorIteratee = categoryIteratee("black");
        const result = reduce(collection, colorIteratee, {"wanted": ["p"]});
        expect(result).toStrictEqual({"wanted": ["p", "b", "c"]});
    });

    test("Test that sorting works with ranges", () => {
        const valIteratee = rangeIteratee(1);
        const result = reduce(collection, valIteratee, {"wanted": ["p"]});
        expect(result).toStrictEqual({"wanted": ["p", "b", "d"]});
    });

    test("Test that soring works for maps with empty accumulator", () => {
        const valIteratee = rangeIteratee(1);
        const result = reduce(collection, valIteratee, {});
        expect(result).toStrictEqual({"wanted": ["b", "d"]});
    });

    test("Test that sorting works for arrays with empty accumulator", () => {
        const result = reduce([1, 2], sumIteratee, 0);
        expect(result).toStrictEqual(3);
    });

    /*// Testin suunnittelussa virhe. Kun "accumalator" arvoa ei anneta, funktio käyttää "collection" listan/mapin ensimmäistä arvoa lähtökohtana.
    test("Test that TypeError is thrown when map is tried to reduce without accumulator when it should return a map", () => {
        const valIteratee = rangeIteratee(1);
        const result = reduce(collection, sumIteratee);
        expect(result).toThrow(TypeError);
    });
    
    // Tässä sama
    test("Test that TypeError is thrown when array is tried to reduce without accumulator when it should return an array", () => {
        const result = () => reduce([1, 2, 3, 1], sumIteratee);
        expect(result).toThrow(TypeError);
    });
*/
    // LISÄTTY
    // TypeErrorin saa esim ei toimivalla iteratorilla
    test("Test that TypeError is thrown when iterator is invalid", () => {
        const result = () => reduce([1, 2, 3, 1], invalidItaratee);
        expect(result).toThrow(TypeError);
    });

    test("Test that returns valid value when map is tried to reduce without accumulator when it should return a value", () => {
        const valIteratee = rangeIteratee(1);
        const result = reduce(collection, valIteratee);
        expect(result).toStrictEqual({"color": "blue", "val": 1, "wanted": ["b", "d"]});
    });

    test("Test that returns valid value when array is tried to reduce without accumulator when it should return a value", () => {
        const result = reduce([1, 2], sumIteratee);
        expect(result).toStrictEqual(3);
    });
    
    //Tämä tulee testattua jo ekoissa testeissä
    /*test("Test that sorting works with pre-set accumulator", () => {
        expect(1).toBe(0);
    });*/
});