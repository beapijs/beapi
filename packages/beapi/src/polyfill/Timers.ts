import type { Timer } from '../types'
import type { Client } from '../client'

export class Timers {
  protected _runtimeId = 0
  protected _intervals = new Map<number, Timer>()
  protected _timeouts = new Map<number, Timer>()
  public constructor() {
    this._polyfillIntervals()
    this._polyfillTimeouts()
  }

  public start(client: Client) {
    client.on('Tick', () => {
      this._intervals.forEach((item) => {
        if (isNaN(item.og ?? NaN)) return
        item.tick--
        if (item.tick <= 0) {
          item.cb()
          item.tick = item.og!
        }
      })
    })
    client.on('Tick', () => {
      this._timeouts.forEach((item, key) => {
        item.tick--
        if (item.tick <= 0) {
          item.cb()
          this._timeouts.delete(key)
        }
      })
    })
  }

  protected _polyfillIntervals(): void {
    // @ts-expect-error
    globalThis.setInterval = (callback: CallableFunction, tick: number): number => {
      const id = this._runtimeId++
      this._intervals.set(id, {
        cb: callback,
        tick,
        og: tick,
      })
      return id
    }
    // @ts-expect-error
    globalThis.clearInterval = (id: number): void => {
      this._intervals.delete(id)
    }
  }

  protected _polyfillTimeouts(): void {
    // @ts-expect-error
    globalThis.setTimeout = (callback: CallableFunction, tick: number): number => {
      const id = this._runtimeId++
      this._timeouts.set(id, {
        cb: callback,
        tick,
      })
      return id
    }
    // @ts-expect-error
    globalThis.clearTimeout = (id: number): void => {
      this._timeouts.delete(id)
    }
  }
}
