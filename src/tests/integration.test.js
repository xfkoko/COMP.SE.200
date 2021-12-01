import ceil from "../ceil";
import toNumber from "../toNumber";
import every from "../every";
import get from "../get";
import upperFirst from "../upperFirst";
import reduce from "../reduce";
import filter from "../filter";
import slice from "../slice";
import memoize from "../memoize";
import words from "../words";

const testObject = {"items": [{"name": "apple", "id": 1}, {"name": "banana", "id": 2}, {"name": "pear", "id": 3}],
                    "users": [{"name": "bob", "id": 1}, {"name": "alice", "id": 2}, {"name": "andy", "id": 3}]};

function categoryIteratee(color) {
    function iteratee(result, value, key) {
        if (value.color == color) {
            (result["wanted"] || (result["wanted"] = [])).push({"item": key, val: value.val});
        };
        return result;
    };
    return iteratee;
};

const testCollection = {'a': {val: 1, color: "blue"}, 'b': {val: 2, color: "black"}, 'c': {val: 1, color: "black"},
                    'd': {val: 2, color: "white"}, 'e': {val: 3, color: "black"}, 'f': {val: 10, color: "black"} };

function save(a, b) {
    return b;
}

describe("integration tests", () => {
    test("Test that when toNumber is given a string it is possible to convert further with ceil function", () => {
        const result = ceil(toNumber("1.1"));
        expect(result).toBe(2);
    });
 
    test("Test that list that has all numbers except one string at first doesn’t return true with every function. \
    Afterwards run the list through toNumber and expect every function to return true after that.", () => {
        const array = [1, 2, "3"];
        const result =  every(array, Number.isInteger);
        expect(result).toBe(false);
        const result2 = every(toNumber(array), Number.isInteger);
        expect(result2).toBe(true);
    });

    test("Test that the get function works with upperFirst. The test starts with getting a string \
    value from an object with the get function. After this the string is inputted to the \
    upperFirst function and checked that the first letter has is upper case.", () => {
        const name = get(testObject, "users[0].name");
        expect(name).toBe("bob");
        const newName = upperFirst(name);
        expect(newName).toBe("Bob");
    });

    test("Test that list of items that has been sorted with reduce by color can be further filtered \
    with filter function so that the list returned consist of only items that fulfill both \
    requirements. Afterwards split the items to few arrays with slice so the items are easier \
    to display on multiple pages.", () => {
        const colorIteratee = categoryIteratee("black");
        const result = reduce(testCollection, colorIteratee, {});
        expect(result.wanted).toStrictEqual([{"item": "b", "val": 2}, {"item": "c", "val": 1},
                                            {"item": "e", "val": 3}, {"item": "f", "val": 10}]);
        const result2 = filter(result.wanted, ({val}) => val > 2);
        expect(result2).toMatchObject([{"item": "e", "val": 3}, {"item": "f", "val": 10}]);
        const page1 = slice(result2, 0, 1);
        const page2 = slice(result2, 1);
        expect(page1).toStrictEqual([{"item": "e", "val": 3}]);
        expect(page2).toStrictEqual([{"item": "f", "val": 10}]);
    });

    test("Reduce and filter the list of all items with certain specifications. Afterwards choose \
    few items and memoize them. After this do another search with reduce and filter with \
    different specifications. Choose again few items. Add items from the memoize to the \
    list of newly chosen items. Now the list should contain all the items from both searches.", () => {
        const colorIteratee = categoryIteratee("black");
        const result = reduce(testCollection, colorIteratee, {});
        expect(result.wanted).toStrictEqual([{"item": "b", "val": 2}, {"item": "c", "val": 1},
                                            {"item": "e", "val": 3}, {"item": "f", "val": 10}]);
        const result2 = filter(result.wanted, ({val}) => val > 2);
        expect(result2).toMatchObject([{"item": "e", "val": 3}, {"item": "f", "val": 10}]);
        const memoizer = memoize(save);
        const a = memoizer(result2[0].item, result2[0].val);
        const b = memoizer(result2[1].item, result2[1].val);
        const expected = new Map();
        expected.set("e", 3);
        expected.set("f", 10);
        expect(memoizer.cache).toMatchObject(expected);

        const colorIteratee2 = categoryIteratee("white");
        const result3 = reduce(testCollection, colorIteratee2, {});
        expect(result3.wanted).toStrictEqual([{"item": "d", "val": 2}]);
        const result4 = filter(result3.wanted, ({val}) => val > 1);
        expect(result4).toMatchObject([{"item": "d", "val": 2}]);
        const c = memoizer(result4[0].item, result4[0].val);
        expected.set("d", 2);
        expect(memoizer.cache).toMatchObject(expected);
    });

    test("Use the words function to get the words of a user inputted string. Then use filter to \
    find matching items for each keyword. This use case is used for searching certain products from the store", () => {
        const input = "banana, apple";
        const values = words(input);
        expect(values).toStrictEqual(["banana", "apple"]);
        const items = filter(testObject.items, ({name}) => values.includes(name));
        expect(items).toMatchObject([{"name": "apple", "id": 1}, {"name": "banana", "id": 2}]);
    });
});