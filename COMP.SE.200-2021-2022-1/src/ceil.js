import createRound from './.internal/createRound.js'

/**
 * Computes `number` rounded up to `precision`. (Round up: the smallest integer greater than or equal to a given number.)
 *
 * @since 3.10.0
 * @category Math
 * @param {number} number The number to round up.
 * @param {number} [precision=0] The precision to round up to.
 * @returns {number} Returns the rounded up number.
 * @example
 *
 * ceil(4.006)
 * // => 5
 *
 * ceil(6.004, 2)
 * // => 6.01
 *
 * ceil(6040, -2)
 * // => 6100
 */
const ceil = createRound('ceil')

export default ceil

console.log(ceil(4123.006))
console.log(ceil(4123.006, 2))
console.log(ceil(4123.006, -2))
console.log(ceil(4.006, 0))
console.log(ceil(4.006, "asd"))
console.log(ceil(4.006, true))
console.log(ceil(4.006, 1))
console.log(ceil(4.0006, false))
console.log(ceil(-2211, -2))