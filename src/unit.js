
module.exports = {
  chunk,
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
                 toPairs};

// Arrays

/////////////////////////////////// chunk //////////////////////////////////////////////

// Creates an array of elements split into groups the length of size. 
// If array can't be split evenly, the final chunk will be the remaining elements.

// Arguments
// array (Array): The array to process.
// [size=1] (number): The length of each chunk

// Example
// _.chunk(['a', 'b', 'c', 'd'], 2);
// // => [['a', 'b'], ['c', 'd']]-------output
// _.chunk(['a', 'b', 'c', 'd'], 3);
// // => [['a', 'b', 'c'], ['d']]-------output

function chunk(array, size = 1) {
  if (array === null || typeof array !== 'object' || !('length' in array)) {
    throw new TypeError(`Expected an array, got ${typeof array}`);
  }
  if (typeof size !== 'number' || size % 1 !== 0 || size < 1) {
    throw new Error(`Expected size to be a positive integer, got ${size}`);
  }
  
  let result = [];
  let i, j, chunk;
  
  for (i = 0, j = 0; i < array.length; i += size, j++) {
    chunk = new Array(size);
    for (let k = 0; k < size && i + k < array.length; k++) {
      chunk[k] = array[i + k];
    }
    result[j] = chunk;
  }
  
  return result;
}

 ////////////////////////////////// compact //////////////////////////////////////////////
//  Creates an array with all falsey values removed.
//  The values false, null, 0, "", undefined, and NaN are falsey.

// Arguments
// array (Array): The array to compact.

// Example
// _.compact([0, 1, false, 2, '', 3]);
// // => [1, 2, 3-------output

 function compact(array) {
  if (typeof array !== "object" || !(array instanceof Array)) {
    throw new TypeError("Argument must be an array");
  }  

  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i]) {
      result[result.length] = array[i];
    }
  }
  return result;
}
  
//////////////////////////////// drop ///////////////////////////////////////////////////
// creates a slice of array with n elements dropped from the beginning.

// Arguments
// array (Array): The array to query.
// [n=1] (number): The number of elements to drop.

// Example
// _.drop([1, 2, 3]);
// // => [2, 3] --------------output
// _.drop([1, 2, 3], 2);
// // => [3] -----------------output
// _.drop([1, 2, 3], 5);
// // => []-------------------output
// _.drop([1, 2, 3], 0);
// // => [1, 2, 3]------------output


  function drop(array, n=1) {
    if (typeof array !== "object" || !(array instanceof Array)) {
      throw new TypeError("Argument must be an array");
    }    
    if (typeof n !== "number") {
      throw new TypeError("Second argument must be a number");
    }
    if(n<0){
      throw new Error("Second argument must be greater than or equal to 0");
    }
    let result = [];
  for (let i = n; i < array.length; i++) {
    result[result.length] = array[i];
  }
  return result;
    
  }

  
  ////////////////////////////// dropWhile //////////////////////////////////////////////
  //  Creates a slice of array excluding elements dropped from the beginning. 
  //  Elements are dropped until predicate returns falsey. 
  //  The predicate is invoked with three arguments: (value, index, array).

//   Arguments
// array (Array): The array to query.
// [predicate=_.identity] (Function): The function invoked per iteration.

/*Example
var users = [
  { 'user': 'barney',  'active': false },
  { 'user': 'fred',    'active': false },
  { 'user': 'pebbles', 'active': true }
];
 
_.dropWhile(users, function(o) { return !o.active; });
// => objects for ['pebbles']-------------output
 
// The `_.matches` iteratee shorthand.
_.dropWhile(users, { 'user': 'barney', 'active': false });
// => objects for ['fred', 'pebbles']-------------output
 
// The `_.matchesProperty` iteratee shorthand.
_.dropWhile(users, ['active', false]);
// => objects for ['pebbles']-------------output
 
// The `_.property` iteratee shorthand.
_.dropWhile(users, 'active');
// => objects for ['barney', 'fred', 'pebbles']-------------output */

function dropWhile(array, predicate = (val) => val) {
  if (!Array.isArray(array)) {
    throw new TypeError('The first argument must be an array');
  }
  const result = [];
  let startIndex = 0;
  for (let i = 0; i < array.length; i++) {
    const curr = array[i];
    let match = false;
    if (typeof predicate === 'function') {
      match = predicate(curr, i, array);
    } else if (Array.isArray(predicate)) {
      match = curr[predicate[0]] === predicate[1];
    } else if (typeof predicate === 'object') {
      match = Object.keys(predicate).every(key => curr[key] === predicate[key]);
    } else if (typeof predicate === 'string') {
      match = curr[predicate];
    }
    if (!match) {
      startIndex = i;
      break;
    }
  }
  for (let i = startIndex; i < array.length; i++) {
    result[i - startIndex] = array[i];
  }
  return result;
}
  
/////////////////////////////// filter ///////////////////////////////////////////////////
// Iterates over elements of collection, returning an array of all elements
//  predicate returns truthy for.
//  The predicate is invoked with three arguments: (value, index|key, collection). 

//Arguments
// collection (Array|Object): The collection to iterate over.
// [predicate=_.identity] (Function): The function invoked per iteration.

/*Example
var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];
 
_.filter(users, function(o) { return !o.active; });
// => objects for ['fred']
 
// The `_.matches` iteratee shorthand.
_.filter(users, { 'age': 36, 'active': true });
// => objects for ['barney']
 
// The `_.matchesProperty` iteratee shorthand.
_.filter(users, ['active', false]);
// => objects for ['fred']
 
// The `_.property` iteratee shorthand.
_.filter(users, 'active');
// => objects for ['barney'] */

function filter(array, callback) {
  let index = 0;
  let result = [];
  for (const value of array) {
    if (callback(value, index, array)) {
      result[result.length] = value;
    }
    index++;
  }
  return result;
};
 
////////////////////////////////// find //////////////////////////////////////////////
// Iterates over elements of collection, returning the first element predicate returns truthy for.
//  The predicate is invoked with three arguments: (value, index|key, collection).

// Arguments
// collection (Array|Object): The collection to inspect.
// [predicate=_.identity] (Function): The function invoked per iteration.
// [fromIndex=0] (number): The index to search from.

/*var users = [
  { 'user': 'barney',  'age': 36, 'active': true },
  { 'user': 'fred',    'age': 40, 'active': false },
  { 'user': 'pebbles', 'age': 1,  'active': true }
];
 
_.find(users, function(o) { return o.age < 40; });
// => object for 'barney'
 
// The `_.matches` iteratee shorthand.
_.find(users, { 'age': 1, 'active': true });
// => object for 'pebbles'
 
// The `_.matchesProperty` iteratee shorthand.
_.find(users, ['active', false]);
// => object for 'fred'
 
// The `_.property` iteratee shorthand.
_.find(users, 'active');
// => object for 'barney'*/

function find(collection, predicate = identity, fromIndex = 0) {
  function identity(val) {
    return val;
  }
  
  for (let i = fromIndex; i < collection.length; i++) {
    let value = collection[i];
    if (typeof predicate === 'function' && predicate(value, i, collection)) {
      return value;
    }
  }
  return undefined
}




/////////////////////////////// map ///////////////////////////////////////////////////
// Creates an array of values by running each element in collection thru iteratee. 
// The iteratee is invoked with three arguments:
// (value, index|key, collection).

// Arguments
// collection (Array|Object): The collection to iterate over.
// [iteratee=_.identity] (Function): The function invoked per iteration.

// Example
// function square(n) {
//   return n * n;
// }
// _.map([4, 8], square);
// // => [16, 64]
// _.map({ 'a': 4, 'b': 8 }, square);
// // => [16, 64] (iteration order is not guaranteed)
// var users = [
//   { 'user': 'barney' },
//   { 'user': 'fred' }
// ]; 
// // The `_.property` iteratee shorthand.
// _.map(users, 'user');
// // => ['barney', 'fred']

function map(array, iteratee) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = iteratee(array[i], i, array);
  }
  return result;
}

////////////////////////////////// take ////////////////////////////////////////////////
// Creates a slice of array with n elements taken from the beginning.

// Arguments
// array (Array): The array to query.
// [n=1] (number): The number of elements to take.

// Example
// _.take([1, 2, 3]);
// // => [1]
// _.take([1, 2, 3], 2);
// // => [1, 2] 
// _.take([1, 2, 3], 5);
// // => [1, 2, 3]
// _.take([1, 2, 3], 0);
// // => []

function take(array, n = 1) {
  const result = [];
  for (let i = 0; i < n && i < array.length; i++) {
    result[i] = array[i];
  }
  return result;
};

////////////////////////////////// includes /////////////////////////////////////////////
/*Checks if value is in collection. If collection is a string, 
it's checked for a substring of value, otherwise SameValueZero is used for equality 
comparisons. If fromIndex is negative, it's used as the offset from the end of collection.*/

// Arguments
// collection (Array|Object|string): The collection to inspect.
// value (*): The value to search for.
// [fromIndex=0] (number): The index to search from.

// Example
// _.includes([1, 2, 3], 1);
// // => true 
// _.includes([1, 2, 3], 1, 2);
// // => false 
// _.includes({ 'a': 1, 'b': 2 }, 1);
// // => true 
// _.includes('abcd', 'bc');
// // => true

function includes(collection, value, fromIndex = 0) {

  if (typeof collection === "string") {
    return collection.indexOf(value, fromIndex) !== -1;
  }
  if (typeof collection !== "object" || !(collection instanceof Array)) {
    for (let i = fromIndex; i < collection.length; i++) {
      if (collection[i] === value) {
        return true;
      }
    }
  }
  if (typeof collection === "object") {
    for (const key in collection) {
      if (collection[key] === value) {
        return true;
      }
    }
  }
  return false;
}

////////////////////////////// zip //////////////////////////////////////////////////////
// Creates an array of grouped elements, the first of which contains the first elements of the given arrays,
//  the second of which contains the second elements of the given arrays, and so on.

// Arguments
// [arrays] (...Array): The arrays to process.

// Example
// _.zip(['a', 'b'], [1, 2], [true, false]);
// // => [['a', 1, true], ['b', 2, false]]

function zip(...arrays) {
  if (!arrays.every(Array.isArray)) {
    throw new TypeError('All arguments must be arrays');
  }
  const result = [];
  let length = Infinity;
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length < length) {
      length = arrays[i].length;
    }
  }
  for (let i = 0; i < length; i++) {
    let subArray = [];
    for (let j = 0; j < arrays.length; j++) {
      subArray[j] = arrays[j][i];
    }
    result[i] = subArray;
  }
  return result;
}




  ////////////////////////////// Objects Methods ////////////////////////////////////////
  
  ////////////////////////////////// merge //////////////////////////////////////////////
  /*This method is like _.assign except that it recursively merges own and inherited 
  enumerable string keyed properties of source objects into the destination object. 
  Source properties that resolve to undefined are skipped if a destination value exists. 
  Array and plain object properties are merged recursively. 
  Other objects and value types are overridden by assignment. 
  Source objects are applied from left to right. 
  Subsequent sources overwrite property assignments of previous sources.*/

//   Arguments
// object (Object): The destination object.
// [sources] (...Object): The source objects.

// Example
// var object = {
//   'a': [{ 'b': 2 }, { 'd': 4 }]
// }; 
// var other = {
//   'a': [{ 'c': 3 }, { 'e': 5 }]
// };
// _.merge(object, other);
// // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

  function merge(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object") {
      throw new TypeError("Both arguments must be objects");
    }
  
    let result = {};
    for (let key in obj1) {
      result[key] = obj1[key];
    }
    for (let key in obj2) {
      result[key] = obj2[key];
    }
    return result;
  }

  
///////////////////////////////////// omit  ///////////////////////////////////////////////
// The opposite of _.pick; this method creates an object composed of the own and inherited
//  enumerable property paths of object that are not omitted.

// object (Object): The source object.
// [paths] (...(string|string[])): The property paths to omit.

// Example
// var object = { 'a': 1, 'b': '2', 'c': 3 };
// _.omit(object, ['a', 'c']);
// // => { 'b': '2' }

function omit(obj, keys) {
  if (typeof obj !== "object") {
    throw new TypeError("First argument must be an object");
  }
  if (!Array.isArray(keys)) {
    throw new TypeError("Second argument must be an array");
  }

  let result = {};
  for (let key in obj) {
    if (!keys.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}


  /* /////////////////////////////////_.omitBy ///////////////////////////////////////////
  The opposite of _.pickBy; this method creates an object composed of the own and
   inherited enumerable string keyed properties of object that predicate doesn't return 
   truthy for. The predicate is invoked with two arguments: (value, key).*/
 
  // argument - object (Object): The source object.
 // argument - [predicate=_.identity] (Function): The function invoked per property.

 /* Example
var object = { 'a': 1, 'b': '2', 'c': 3 }; 
_.omitBy(object, _.isNumber);
// => { 'b': '2' } ------------------output  */

function omitBy(object, predicate = x => x) {
  if (typeof object !== 'object' || object === null) {
    return {};
  }

  const result = {};
  for (const key in object) {
    if (!predicate(object[key], key)) {
      result[key] = object[key];
    }
  }
  return result;
}

///////////////////////////////////// pick /////////////////////////////////////////////
// Creates an object composed of the picked object properties.

// Arguments
// object (Object): The source object.
// [paths] (...(string|string[])): The property paths to pick.

// var object = { 'a': 1, 'b': '2', 'c': 3 };
// _.pick(object, ['a', 'c']);
// // => { 'a': 1, 'c': 3 }

function pick(obj, props) {
  if (typeof obj !== 'object' || obj === null) {
    return {};
  }
  let result = {};
  for (let i = 0; i < props.length; i++) {
    let prop = props[i];
    if (obj.hasOwnProperty(prop)) {
      result[prop] = obj[prop];
    }
  }
  return result;
}

////////////////////////////////  pickBy //////////////////////////////////////////////
//  Creates an object composed of the object properties predicate returns 
// truthy for. The predicate is invoked with two arguments: (value, key).

// Arguments
// object (Object): The source object.
// [predicate=_.identity] (Function): The function invoked per property.

// Example
// var object = { 'a': 1, 'b': '2', 'c': 3 };
// _.pickBy(object, _.isNumber);
// // => { 'a': 1, 'c': 3 } ----- output

function pickBy(obj, predicate) {
  const result = {};
  if (!obj || typeof obj !== 'object') return result;
  if (!predicate || typeof predicate !== 'function') return obj;

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && predicate(obj[prop], prop)) {
      result[prop] = obj[prop];
    }
  }

  return result;
}

///////////////////////////////////  toPairs ////////////////////////////////////////////
// Creates an array of own enumerable string keyed-value pairs for object 
// which can be consumed by _.fromPairs. If object is a map or set, its entries are returned.

// Arguments
// object (Object): The object to query.

// Example
// function Foo() {
//   this.a = 1;
//   this.b = 2;
// }
// Foo.prototype.c = 3; 
// _.toPairs(new Foo);
// // => [['a', 1], ['b', 2]] ----output

function toPairs(obj) {
  if (!obj || typeof obj !== 'object') return [];
  let result = [];

  for (let prop in obj) {
    if (obj.hasOwnProperty(prop) && obj[prop] != null) {
      result[result.length] = [prop, obj[prop]];
    }
  }

  return result;
}



