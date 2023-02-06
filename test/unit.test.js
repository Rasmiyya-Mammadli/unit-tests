 const {chunk,
   compact,
    drop,
     filter,
      find,
       map,
        take,
         includes,
          dropWhile,
           zip,
            merge,
             omit,
              omitBy,
               pick,
                pickBy,
                 toPairs }= require('../src/unit');


//////////////////////////////////// Chunk ///////////////////////////////////////////////

  describe("chunk", () => {
  it("should chunk the array into groups of the specified size", () => {
  const arr = [1, 2, 3, 4];
  const size = 2;
  const result = chunk(arr, size);
  expect(result).toEqual([[1, 2], [3, 4]]);
  });
  
  it("should return an array of arrays of size 1 if no size is specified", () => {
  const arr = [1, 2, 3, 4];
  const result = chunk(arr);
  expect(result).toEqual([[1], [2], [3], [4]]);
  });

  it("should return an array of arrays of size equal to the length of the array if size is greater than the length of the array", () => {
  const arr = [1, 2, 3, 4];
  const size = 5;
  const result = chunk(arr, size);
  expect(result).toEqual([[1, 2, 3, 4]]);
  });
  
  it("should return an empty array if the array is empty", () => {
  const arr = [];
  const size = 2;
  const result = chunk(arr, size);
  expect(result).toEqual([]);
  });

  it("should throw a TypeError if the first argument is not an array", () => {
  const notArray = "not an array";
  const obj = {};
  const n = null;
  const u = undefined;
  const size = 2;
  expect(() => chunk(notArray, size)).toThrow(TypeError);
  expect(() => chunk(obj, size)).toThrow(TypeError);
  expect(() => chunk(n, size)).toThrow(TypeError);
  expect(() => chunk(u, size)).toThrow(TypeError);
  });

  it("should throw an Error if the second argument is not a positive integer", () => {
  const arr = [1, 2, 3, 4];
  const negativeInt = -2;
  const decimal = 1.5;
  const str = "2";
  const arrAsSize = [2];
  const objAsSize = {};
  expect(() => chunk(arr, negativeInt)).toThrow(Error);
  expect(() => chunk(arr, decimal)).toThrow(Error);
  expect(() => chunk(arr, str)).toThrow(Error);
  expect(() => chunk(arr, arrAsSize)).toThrow(Error);
  expect(() => chunk(arr, objAsSize)).toThrow(Error);
  });
});

/////////////////////////////////// compact //////////////////////////////////////////

describe('compact', () => {
  it('should remove falsy values from the array', () => {
    const result = compact([1, 0, false, 2, '', 3, undefined, null, NaN]);
    expect(result).toEqual([1, 2, 3]);

  });

  it('should return the same array if it contains only truthy values', () => {
    const result = compact([1, 2, 3, 'hello', {}, []]);
    expect(result).toEqual([1, 2, 3, 'hello', {}, []]);
  });

  it('should throw an error if the first argument is not an array', () => {
    expect(() => {
      compact({});
    }).toThrow(TypeError("Argument must be an array"));
    expect(() => {
      compact(123);
    }).toThrow(TypeError("Argument must be an array"));
    expect(() => {
      compact("hello");
    }).toThrow(TypeError("Argument must be an array"));
  });
});


/////////////////////////////////// drop /////////////////////////////////////////////////

describe('drop', () => {
  it('should drop the specified number of elements from the beginning of the array and return a new array', () => {
    const array = [1, 2, 3, 4, 5];
    expect(drop(array)).toEqual([2, 3, 4, 5]);
    expect(drop(array, 2)).toEqual([3, 4, 5]);
  });

  it('should return the original array if n is 0', () => {
    const array = [1, 2, 3, 4, 5];
    expect(drop(array, 0)).toEqual(array);
  });

  it('should return an empty array if all elements are dropped', () => {
    const array = [1, 2, 3, 4, 5];
    expect(drop(array, 5)).toEqual([]);
    expect(drop(array, 10)).toEqual([]);
  });

  it('should throw an error if the first argument is not an array', () => {
    const notArray = 'not an array';
    expect(() => drop(notArray)).toThrow(TypeError);
    expect(() => drop(notArray, 2)).toThrow(TypeError);
  });

  it('should throw an error if the second argument is not a number', () => {
    const array = [1, 2, 3, 4, 5];
    const notNumber = 'not a number';
    expect(() => drop(array, notNumber)).toThrow(TypeError);
  });

  it('should throw an error if the second argument is less than 0', () => {
    expect(() => drop([1, 2, 3, 4, 5], -1)).toThrow();
  });
});


///////////////////////////////////// filter //////////////////////////////////////////

describe('filter', () => {
  it('returns an array with only the truthy values from the input array', () => {
    const input = [1, '', 0, 2, false, 3, null, undefined];
    const expectedOutput = [1, 2, 3];
    const output = filter(input, Boolean);
    expect(output).toEqual(expectedOutput);
  });
  
  it('returns an empty array when the input array is empty', () => {
    const input = [];
    const expectedOutput = [];
    const output = filter(input, Boolean);
    expect(output).toEqual(expectedOutput);
  });
  
  it('returns the input array unchanged when the callback function returns only truthy values', () => {
    const input = [1, 2, 3];
    const expectedOutput = [1, 2, 3];
    const output = filter(input, Boolean);
    expect(output).toEqual(expectedOutput);
  });
  
  it('returns an empty array when the callback function returns only falsy values', () => {
    const input = [1, 2, 3];
    const expectedOutput = [];
    const output = filter(input, () => false);
    expect(output).toEqual(expectedOutput);
  });
});

////////////////////////////////////// find ////////////////////////////////////////////

describe("find", () => {

  it("should return first matched element", () => {
    const users = [
      { "user": "barney",  "age": 36, "active": true },
      { "user": "fred",    "age": 40, "active": false },
      { "user": "pebbles", "age": 1,  "active": true }
    ];
    const result = find(users, o => o.age < 40);
    expect(result).toEqual({ "user": "barney",  "age": 36, "active": true });
  });
  
  it("find should return undefined if no objects match the condition specified in the predicate function", () => {
    const users = [
      { 'user': 'barney',  'age': 36, 'active': true },
      { 'user': 'fred',    'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1,  'active': true }
    ];
  
    const result = find(users, (o) => o.age > 40);
    expect(result).toBeUndefined();
  });
  
  it("find should return undefined if the collection argument is not an array", () => {
    const result = find({}, (o) => o.age < 40);
    expect(result).toBeUndefined();
  });
  
  it("find should return the object at the index specified by fromIndex", () => {
    const users = [
      { 'user': 'barney',  'age': 36, 'active': true },
      { 'user': 'fred',    'age': 40, 'active': false },
      { 'user': 'pebbles', 'age': 1,  'active': true }
    ];
  
    const result = find(users, (o) => o.age < 40, 1);
    expect(result).toEqual({ 'user': 'pebbles', 'age': 1,  'active': true });
  });
  
});

///////////////////////////////////// map //////////////////////////////////////////////


describe('map', () => {
  it("maps values in an array", () => {
    const array = [4, 8];
    const square = n => n * n;
    const result = map(array, square);
    expect(result).toEqual([16, 64]);
  });

  it("maps values in an object", () => {
    const object = { a: 4, b: 8 };
    const square = n => n * n;
    const result = map(Object.values(object), square);
    expect(result).toEqual([16, 64]);
  });

  it("maps values using a property", () => {
    const users = [{ user: "barney" }, { user: "fred" }];
    const iteratee = function(value) {
      return value.user;
    };
    const result = map(users, iteratee);
    expect(result).toEqual(["barney", "fred"]);
  });

  it('should throw an error if the first argument is not an array or object', () => {
    expect(() => map('not an array or object', iteratee)).toThrow();
  });
});

/////////////////////////////////// includes ////////////////////////////////////////////


describe("includes", () => {
  it("returns true for array that contains the target value", () => {
    const collection = [1, 2, 3];
    const result = includes(collection, 1);
    expect(result).toEqual(true);
  });

  it("returns false for array that does not contain the target value", () => {
    const collection = [1, 2, 3];
    const result = includes(collection, 4);
    expect(result).toEqual(false);
  });

  it("returns true for object that contains the target value", () => {
    const collection = { a: 1, b: 2 };
    const result = includes(collection, 1);
    expect(result).toEqual(true);
  });

  it("returns true for string that contains the target value", () => {
    const collection = "abcd";
    const result = includes(collection, "bc");
    expect(result).toEqual(true);
  });

  it("returns false for string that does not contain the target value", () => {
    const collection = "abcd";
    const result = includes(collection, "ef");
    expect(result).toEqual(false);
  });
});


///////////////////////////////// take ///////////////////////////////////////////////////
describe('take', () => {
  it('takes the first element by default', () => {
    expect(take([1, 2, 3])).toEqual([1]);
  });

  it('takes n elements from the beginning', () => {
    expect(take([1, 2, 3], 2)).toEqual([1, 2]);
  });

  it('returns all elements if n is greater than the length of the array', () => {
    expect(take([1, 2, 3], 5)).toEqual([1, 2, 3]);
  });

  it('returns an empty array if n is zero', () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });
});

///////////////////////////////////// dropWhile /////////////////////////////////////////////

describe('dropWhile', () => {
  it('excludes elements dropped from the beginning', () => {
    const users = [
      { 'user': 'barney',  'active': false },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const result = dropWhile(users, (o) => !o.active);
    expect(result).toEqual([{ 'user': 'pebbles', 'active': true }]);
  });

  it('accepts an object for the predicate', () => {
    const users = [
      { 'user': 'barney',  'active': false },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const result = dropWhile(users, { 'user': 'barney', 'active': false });
    expect(result).toEqual([
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ]);
  });

  it('accepts an array for the predicate', () => {
    const users = [
      { 'user': 'barney',  'active': false },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const result = dropWhile(users, ['active', false]);
    expect(result).toEqual([{ 'user': 'pebbles', 'active': true }]);
  });

  it('accepts a string for the predicate', () => {
    const users = [
      { 'user': 'barney',  'active': false },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ];
    const result = dropWhile(users, 'active');
    expect(result).toEqual([
      { 'user': 'barney',  'active': false },
      { 'user': 'fred',    'active': false },
      { 'user': 'pebbles', 'active': true }
    ]);
  });

  it('returns an empty array if the array is empty', () => {
    expect(dropWhile([], (o) => !o.active)).toEqual([]);
  });

  it('throws a TypeError if the first argument is not an array', () => {
    expect(() => dropWhile('not an array', () => {})).toThrow(TypeError);
    expect(() => dropWhile({}, () => {})).toThrow(TypeError);
    expect(() => dropWhile(null, () => {})).toThrow(TypeError);
    expect(() => dropWhile(undefined, () => {})).toThrow(TypeError);
    });
    });

////////////////////////////////////////// zip //////////////////////////////////////////

describe('zip', () => {
  it('group elements of arrays together', () => {
    const result = zip(['a', 'b'], [1, 2], [true, false]);
    expect(result).toEqual([['a', 1, true], ['b', 2, false]]);
  });

  it('returns an empty array if all arrays are empty', () => {
    expect(zip([], [], [])).toEqual([]);
  });

  it('returns an empty array if any of the arrays is empty', () => {
    expect(zip([1], [], [3])).toEqual([]);
  });

  it('throws a TypeError if any argument is not an array', () => {
    expect(() => zip('not an array', [], [])).toThrow(TypeError);
    expect(() => zip({}, [], [])).toThrow(TypeError);
    expect(() => zip(null, [], [])).toThrow(TypeError);
    expect(() => zip(undefined, [], [])).toThrow(TypeError);
  });
})


////////////////////////////////// merge ////////////////////////////////////////////////
describe("merge", () => {
  it("throws an error if arguments are not objects", () => {
    expect(() => {
      merge("", {});
    }).toThrow("Both arguments must be objects");
  
    expect(() => {
      merge({}, "");
    }).toThrow("Both arguments must be objects");

  });
  
  it("merges two objects correctly", () => {
    let obj1 = { a: 1, b: 2 };
    let obj2 = { b: 3, c: 4 };
    let result = merge(obj1, obj2);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });
});

///////////////////////////////////// omit ////////////////////////////////////////////////

describe('omit', () => {
  it('should omit the specified keys from the object', () => {
    const result = omit({ name: 'John', age: 30, city: 'London' }, ['age', 'city']);
    expect(result).toEqual({ name: 'John' });
  });

  it('should return the same object if the specified keys are not found in the object', () => {
    const result = omit({ name: 'John', age: 30, city: 'London' }, ['country']);
    expect(result).toEqual({ name: 'John', age: 30, city: 'London' });
  });

  it('should throw an error if the first argument is not an object', () => {
    expect(() => omit('not an object', ['age'])).toThrow();
  });

  it('should throw an error if the second argument is not an array', () => {
    expect(() => omit({ name: 'John', age: 30, city: 'London' }, 'age')).toThrow();
  });
});

///////////////////////////////// omitBy /////////////////////////////////////////////////

describe('omitBy', () => {
  it('omits properties based on the result of the predicate function', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = omitBy(object, (value) => value % 2 === 0);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it('returns a new object', () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = omitBy(object, (value) => value % 2 === 0);
    expect(result).not.toBe(object);
  });

  it('ignores non-enumerable properties', () => {
    const object = Object.create({ a: 1 }, { b: { value: 2, enumerable: true } });
    const result = omitBy(object, (value) => value % 2 === 0);
    expect(result).toEqual({ a: 1 });
  });
  
  it('returns an empty object if the input is not an object', () => {
    expect(omitBy(null, (value) => value % 2 === 0)).toEqual({});
    expect(omitBy(undefined, (value) => value % 2 === 0)).toEqual({});
    expect(omitBy('not an object', (value) => value % 2 === 0)).toEqual({});
  });
  
});

///////////////////////////////////////// pick ///////////////////////////////////////////

describe('pick', () => {
  it('should return an empty object when the first argument is not an object or is null', () => {
    expect(pick(undefined, [])).toEqual({});
    expect(pick(null, [])).toEqual({});
    expect(pick('', [])).toEqual({});
    expect(pick(123, [])).toEqual({});
    expect(pick(true, [])).toEqual({});
  });

  it('returns an empty object if the input is not an object', () => {
    expect(pick(null, ['a', 'c'])).toEqual({});
    expect(pick(undefined, ['a', 'c'])).toEqual({});
    expect(pick('not an object', ['a', 'c'])).toEqual({});
  });

  it('should return the picked properties from the input object', () => {
    expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    expect(pick({ a: 1, b: 2, c: 3 }, ['b'])).toEqual({ b: 2 });
    expect(pick({ a: 1, b: 2, c: 3 }, [])).toEqual({});
  });

  it('should only return the properties that exist in the input object', () => {
    expect(pick({ a: 1, b: 2 }, ['a', 'c'])).toEqual({ a: 1 });
    expect(pick({ a: 1, b: 2 }, ['c'])).toEqual({});
  });
});


//////////////////////////////////////// pickBy ////////////////////////////////////

/*This test suite covers the following cases:

Properties that are even numbers should be picked
Properties that are strings should not be picked
Properties that are undefined, null or NaN should be picked
Empty objects and objects with non-function predicates should return an empty object
Inputs that are not objects should return an empty object */

describe('pickBy', () => {

  it('should return an object with only the properties that satisfy the given predicate', () => {
    const isEven = num => typeof num === 'number' && num % 2 === 0;
    
    let obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(pickBy(obj, isEven)).toEqual({ b: 2, d: 4 });

    obj = { a: 1, b: '2', c: '3', d: 4 };
    expect(pickBy(obj, isEven)).toEqual({ d: 4 });

    obj = { a: 1, b: undefined, c: null, d: 4 };
    expect(pickBy(obj, isEven)).toEqual({ d: 4 });

    obj = { a: NaN, b: 2, c: 3, d: 4 };
    expect(pickBy(obj, isEven)).toEqual({ b: 2, d: 4 });

    obj = { a: 1, b: 2 };
    let isString = (val) => typeof val === 'string';
    expect(pickBy(obj, isString)).toEqual({});

    obj = {};
    expect(pickBy(obj, isEven)).toEqual({});
  });

  it('should return an empty object when the input is not an object or the predicate is not a function', () => {
    expect(pickBy(null, () => {})).toEqual({});
    expect(pickBy({}, 'not a function')).toEqual({});
    expect(pickBy(123, () => {})).toEqual({});
    expect(pickBy('abc', () => {})).toEqual({});
    expect(pickBy(undefined, () => {})).toEqual({});
    expect(pickBy(true, () => {})).toEqual({});
  });
});

////////////////////////////////// toPairs //////////////////////////////////////////////

describe('toPairs', () => {
  it('should return an empty array if the input is not an object', () => {
    expect(toPairs(undefined)).toEqual([]);
    expect(toPairs(null)).toEqual([]);
    expect(toPairs(1)).toEqual([]);
    expect(toPairs('abc')).toEqual([]);
    expect(toPairs(true)).toEqual([]);
  });

  it('should return an array of own enumerable string keyed-value pairs for the input object', () => {
    let obj = { a: 1, b: 2 };
    expect(toPairs(obj)).toEqual([['a', 1], ['b', 2]]);

    obj = { a: -1, b: -2 };
    expect(toPairs(obj)).toEqual([['a', -1], ['b', -2]]);

    obj = { a: 0.1, b: 0.2 };
    expect(toPairs(obj)).toEqual([['a', 0.1], ['b', 0.2]]);

    obj = { a: 0, b: 2 };
    expect(toPairs(obj)).toEqual([['a', 0], ['b', 2]]);

    obj = { a: Number.POSITIVE_INFINITY, b: Number.NEGATIVE_INFINITY };
    expect(toPairs(obj)).toEqual([['a', Number.POSITIVE_INFINITY], ['b', Number.NEGATIVE_INFINITY]]);

    obj = { a: 'abc', b: 2 };
    expect(toPairs(obj)).toEqual([['a', 'abc'], ['b', 2]]);

    obj = { a: undefined, b: 2 };
    expect(toPairs(obj)).toEqual([['b', 2]]);
  });
});
