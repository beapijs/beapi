/**
 * Internal timer object.
 * Contains needed data for doing timer methods.
 */
export interface Timer {
  /**
   * Function to be called.
   */
  cb: CallableFunction
  /**
   * Tick wait amount.
   */
  tick: number
  /**
   * Original execution tick.
   */
  og?: number
}
