/**
 * Simple safe id's.
 * Provide the class a unique number not being used
 * and it will generate ids based off the current epoch
 * with a generation increment that resets every 10000.
 *
 * This is a very simple system proved to work with database entries.
 */
export class SafeIds {
  /**
   * Protected epoch store.
   */
  protected epoch: number
  /**
   * Protected unique id store.
   */
  protected unique: number
  /**
   * Protected current generation store.
   */
  protected inc = 0

  /**
   * Simple safe id's.
   * Provide the class a unique number not being used
   * and it will generate ids based off the current epoch
   * with a generation increment that resets every 10000.
   *
   * This is a very simple system proved to work with database entries.
   * @param unique Ensure this is unique for 99.9% safe ids.
   * @param epoch Optional amount to subtract from current time.
   */
  public constructor(unique: number, epoch = 0) {
    this.epoch = epoch
    this.unique = unique
  }

  /**
   * Get the next increment.
   */
  protected get increment() {
    if (this.inc === 10000) return (this.inc = 0)
    return this.inc++
  }

  /**
   * Generate a new (99.9% hopefully unique) id.
   * @returns
   */
  public generate(): string {
    const now = Date.now()

    return `${Math.abs(now - this.epoch)}_${this.increment}_${this.unique}`
  }
}
