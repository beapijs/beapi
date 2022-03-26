import type { KeysOfCommandTypes } from '../types'
import type { CommandExecState } from '.'

// Create references to global constructors with different
// Names so not to interfere with CommandTypes namespace.
const StringConstructor = String
const NumberConstructor = Number
const BooleanConstructor = Boolean

/**
 * Dedicated namespace to organize different command parameter types.
 * Namespace were chosen because they are easy to add on to and look
 * better.
 */
export namespace CommandTypes {
  /**
   * String command parameter type. When used expects user input of:
   * ```n
   * somestring
   * ```
   *
   * or
   *
   * ```n
   * "some string with spaces"
   * ```
   */
  export class String extends StringConstructor {
    /**
     * Display name used when generating the command usage.
     */
    public static displayName = 'string'

    /**
     * Extract method, accepts a command execution state
     * and attempts to pick up off where last extractor completed.
     *
     * Can return undefined if input is incorrect.
     *
     * `The return value of this method is used to infer callback
     * argument types`
     *
     * @param {CommandExecState} a Command execution state.
     * @returns {string | undefined}
     */
    public static extract(a: CommandExecState): string | undefined {
      // Read next argument in slice array.
      const text = a.readNext()

      // Ensure the argument is valid and defined.
      if (typeof text === 'string') {
        // If an empty string call extract again to try next argument.
        if (!text.length) return this.extract(a)

        // If text starts with quotation its a string scope.
        if (text.startsWith('"')) {
          // Create array to hold the final scope.
          const final = []

          // Create variable i and assign to current argument
          // While i is a typeof string continue looping
          // After every increment assign i to next argument
          for (let i: string | undefined = text; typeof i === 'string'; i = a.readNext()) {
            // Push current argument to final scope array.
            final.push(i)

            // If current argument endswith quotation and its not the
            // first quotation mark, scope was ended so stop loop.
            if (i.endsWith('"') && (i.length > 1 || final.length > 1)) break
          }

          // If last element in final string scope does end with
          // a quatation then its a closed scope so return.
          if (final[final.length - 1].endsWith('"')) return final.join(' ').slice(1).slice(0, -1)
          // Otherwise its an unclosed string scope so we need
          // to throw an error to the executor.
          a.throwSyntaxError('Unclosed string scope! Expected: "')

          // Not string scope, just return text argument
        } else return text

        // If argument is invalid/undefined throw expected argument syntax error.
      } else a.throwSyntaxError('Expected argument!')
    }
  }

  export class Number extends NumberConstructor {
    /**
     * Display name used when generating the command usage.
     */
    public static displayName = 'number'

    /**
     * Extract method, accepts a command execution state
     * and attempts to pick up off where last extractor completed.
     *
     * Can return undefined if input is incorrect.
     *
     * `The return value of this method is used to infer callback argument types`
     *
     * @param {CommandExecState} a Command execution state.
     * @returns {number | undefined}
     */
    public static extract(a: CommandExecState): number | undefined {
      // Read next argument in slice array.
      const text = a.readNext()

      // Ensure the argument is valid and defined.
      if (typeof text === 'string') {
        // If an empty string call extract again to try next argument.
        if (!text.length) return this.extract(a)

        // Attempt to parse argument as a float.
        const num = parseFloat(text)

        // If not NaN return the integer.
        if (num) return num
        // Otherwise throw syntax error with tip.
        a.throwSyntaxError(`Expected integer or floating point!`)

        // If argument is invalid/undefined throw expected argument syntax error.
      } else a.throwSyntaxError('Expected argument!')
    }
  }

  export class Boolean extends BooleanConstructor {
    /**
     * Display name used when generating the command usage.
     */
    public static displayName = 'boolean'

    /**
     * Extract method, accepts a command execution state
     * and attempts to pick up off where last extractor completed.
     *
     * Can return undefined if input is incorrect.
     *
     * `The return value of this method is used to infer callback argument types`
     *
     * @param {CommandExecState} a Command execution state.
     * @returns {boolean | undefined}
     */
    public static extract(a: CommandExecState): boolean | undefined {
      // Read next argument in slice array.
      let text = a.readNext()

      // Ensure the argument is valid and defined.
      if (typeof text === 'string') {
        // If an empty string call extract again to try next argument.
        if (!text.length) return this.extract(a)

        // Convert argument to lowercase for easier comparison.
        text = text.toLowerCase()

        // If not true of false then invalid type throw error.
        if (text !== 'true' && text !== 'false') a.throwSyntaxError(`Expected "true" or "false"!`)
        // Else return what type it is by checking if argument
        // is equal to true, if so it returns true else false.
        else return text === 'true'

        // If argument is invalid/undefined throw expected argument syntax error.
      } else a.throwSyntaxError('Expected argument!')
    }
  }
}

/**
 * Helper function to check if an object contains and CommadTypes.
 * Used for the register command overload to check arguments.
 * @param {object} o object to check
 * @returns {boolean}
 */
export function checkObjectForCommandTypes(o: object): boolean {
  // Get the first entry in the object.
  let firstAssignment = Object.values(o)[0]

  // If its and array then the contructor *should* be of index 0.
  if (Array.isArray(firstAssignment)) firstAssignment = firstAssignment[0]

  // For each item in CommandTypes.
  for (const key in CommandTypes) {
    // If first entry "constructor" is equal to
    // CommandTypes constructor return true.
    if (firstAssignment === CommandTypes[key as KeysOfCommandTypes]) return true
  }

  // If does not return true in for loop
  // then not a CommanType.
  return false
}
