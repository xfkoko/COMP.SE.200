import arrayReduce from './.internal/arrayReduce.js'
import baseEach from './.internal/baseEach.js'
import baseReduce from './.internal/baseReduce.js'
import _ from "lodash"

/**
 * Reduces `collection` to a value which is the accumulated result of running
 * each element in `collection` thru `iteratee`, where each successive
 * invocation is supplied the return value of the previous. If `accumulator`
 * is not given, the first element of `collection` is used as the initial
 * value. The iteratee is invoked with four arguments:
 * (accumulator, value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `reduce`, `reduceRight`, and `transform`.
 *
 * The guarded methods are:
 * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
 * and `sortBy`
 *
 * @since 0.1.0
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @returns {*} Returns the accumulated value.
 * @see reduceRight, transform
 * @example
 *
 * reduce([1, 2], (sum, n) => sum + n, 0)
 * // => 3
 *
 * reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
 *   (result[value] || (result[value] = [])).push(key)
 *   return result
 * }, {})
 * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
 */
function reduce(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce
  const initAccum = arguments.length < 3
  //console.log(arguments.length)
  //console.log(initAccum)
  return func(collection, iteratee, accumulator, initAccum, baseEach)
}

export default reduce
//console.log(_.includes)
//console.log(reduce({ 'a': 1, 'b': 2, 'a': 1 }, (a) => _.defaults(a), {}))

/*console.log(reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
     (result[value] || (result[value] = [])).push(key)
     return result
   }, {}))*/

/*console.log(reduce({ 'a': {val: 1, color: "blue"}, 'b': {val: 2, color: "black"}, 'c': {val: 1, color: "black"}, 'd': {val: 2, color: "white"} }, (result, value, key) => {
  if (value.val > 1 && value.color == "black") {
    (result["wanted"] || (result["wanted"] = [])).push(key)
    }
    return result
  }, {"wanted": ['p']}))*/

console.log(reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key, something) => {
  result = result + value
  return result
  }))

/*  console.log(reduce([1,2,3,1], (result, value, key) => {
    (result[value] || (result[value] = [])).push(key)
    return result
  }))*/