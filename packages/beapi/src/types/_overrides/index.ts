// This will contain a multitude of errors
// Alot of conflicts with @types/node.
// Please bear with us
export {}

// @ts-ignore
declare global {
  interface Console {
    /**
     * Sends a BeAPI log to the content log in-game.
     * @param {string} message Primary message.
     * @param {string} optionalParams Optional extra fragments.
     */
    // @ts-ignore
    log: (message: string, ...optionalParams: string[]) => void
    /**
     * Sends a BeAPI error log to the content log in-game.
     * @param {string} message Primary message.
     * @param {string} optionalParams Optional extra fragments.
     */
    // @ts-ignore
    warn: (message: string, ...optionalParams: string[]) => void
    /**
     * Sends a BeAPI warn log to the content log in-game.
     * @param {string} message Primary message.
     * @param {string} optionalParams Optional extra fragments.
     */
    // @ts-ignore
    error: (message: string, ...optionalParams: string[]) => void
    /**
     * Sends a BeAPI info log to the content log in-game.
     * @param {string} message Primary message.
     * @param {string} optionalParams Optional extra fragments.
     */
    // @ts-ignore
    info: (message: string, ...optionalParams: string[]) => void
    /**
     * Sends a BeAPI debug log to the content log in-game.
     * @param {string} message Primary message.
     * @param {string} optionalParams Optional extra fragments.
     */
    // @ts-ignore
    debug: (message: string, ...optionalParams: string[]) => void
    // @ts-ignore
  }
  /**
   * BeAPI console override.
   * The only methods supported are `log | error | warn | info | debug`!
   * All logs will be piped to content log ingame with formatting.
   */
  // @ts-expect-error
  const console: Console

  /**
   * `require` is not valid in gametest doughnut. See [MDN import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import).
   */
  // @ts-expect-error
  const require: undefined

  /**
   * BeAPI gametest compatible timeout. **Uses ticks not milliseconds!**
   * @param callback Callback function to be called.
   * @param tick Timeout in ticks.
   */
  // @ts-ignore
  function setTimeout(callback: CallableFunction, tick: number): number
  /**
   * BeAPI gametest compatible interval. **Uses ticks not milliseconds!**
   * @param callback Callback function to be called.
   * @param tick Interval in ticks.
   */
  // @ts-ignore
  function setInterval(callback: CallableFunction, tick: number): number
  /**
   * BeAPI gametest clear timeout.
   * Kills a timeout before it can be executed.
   * @param id Id of the timeout.
   */
  // @ts-ignore
  function clearTimeout(id: number): void
  /**
   * BeAPI gametest clear interval.
   * Kills a interval before it can be executed.
   * @param id Id of the interval.
   */
  // @ts-ignore
  function clearInterval(id: number): void
}
