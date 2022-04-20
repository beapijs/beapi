// Type imports
import type { Timer } from '../types'
import type { Client } from '../client'

/**
 * Polyfill class that overrides `globalThis` timer methods.
 */
export class Timers {
  /**
   * Protected runtime id state.
   */
  protected _runtimeId = 0
  /**
   * Protected active interval map.
   */
  protected _intervals = new Map<number, Timer>()
  /**
   * Protected active timeout map
   */
  protected _timeouts = new Map<number, Timer>()

  /**
   * Polyfill class that overrides `globalThis` timer methods.
   */
  public constructor() {
    this._polyfillIntervals()
    this._polyfillTimeouts()
  }

  /**
   * Start ticking timer events.
   * @param client Client circular reference.
   */
  public start(client: Client) {
    // Tick listener for intervals.
    client.on('Tick', () => {
      // Foreach interval in the map.
      this._intervals.forEach((item, key) => {
        // If no original tick length delete the entry and continue
        // To next iteration.
        if (isNaN(item.og ?? NaN)) return this._intervals.delete(key)

        // Subtract a tick from the countdown
        item.tick--

        // If tick countdown is more than 0 continue to next itr.
        if (item.tick > 0) return

        // Otherwise call the callback.
        item.cb()
        // Set tick back to og.
        item.tick = item.og!
      })
    })
    // Tick listener for timeouts.
    client.on('Tick', () => {
      // Foreach timeout in the map.
      this._timeouts.forEach((item, key) => {
        // Subtract a tick from the countdown
        item.tick--

        // If tick countdown is more than 0 continue to next itr.
        if (item.tick > 0) return

        // Otherwise call the callback.
        item.cb()

        // And remove the timeout.
        this._timeouts.delete(key)
      })
    })
  }

  /**
   * Overrides the globalThis interval methods.
   */
  protected _polyfillIntervals(): void {
    // @ts-expect-error Overrides setInterval method on globalThis.
    globalThis.setInterval = (callback: CallableFunction, tick: number): number => {
      // Interval id will be the next runtime id.
      const id = this._runtimeId++

      // Set interval in interval map.
      this._intervals.set(id, {
        cb: callback,
        tick,
        og: tick,
      })

      // Return given runtime id.
      return id
    }

    // @ts-expect-error Overrides clearInterval method on globalThis.
    globalThis.clearInterval = (id: number): void => {
      // Deletes runtime id from interval map.
      this._intervals.delete(id)
    }
  }

  /**
   * Overrides the globalThis timeout methods.
   */
  protected _polyfillTimeouts(): void {
    // @ts-expect-error Overrides setTimeout method on globalThis.
    globalThis.setTimeout = (callback: CallableFunction, tick: number): number => {
      // Timeout id will be the next runtime id.
      const id = this._runtimeId++

      // Set timeout in the timeout map.
      this._timeouts.set(id, {
        cb: callback,
        tick,
      })

      // Return given runtime id.
      return id
    }

    // @ts-expect-error Overrides clearTimeout method on globalThis.
    globalThis.clearTimeout = (id: number): void => {
      // Deletes runtime id from timeout map.
      this._timeouts.delete(id)
    }
  }
}
