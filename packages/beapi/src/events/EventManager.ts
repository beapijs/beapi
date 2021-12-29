import type { EventValues } from '../@types/BeAPI.i'
import { emitter } from './emitter/emitter.js'
import { defaultEvents } from './events/index.js'

export interface EventManager {
  on<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  on<S extends string | symbol>(event: Exclude<S, keyof EventValues>, callback: (...args: unknown[]) => void): this
  once<K extends keyof EventValues>(event: K, callback: (...args: EventValues[K]) => void): this
  once<S extends string | symbol>(event: Exclude<S, keyof EventValues>, callback: (...args: unknown[]) => void): this
  emit<K extends keyof EventValues>(event: K, ...args: EventValues[K]): boolean
  emit<S extends string | symbol>(event: Exclude<S, keyof EventValues>, ...args: unknown[]): boolean
}

export class EventManager extends emitter {
  private readonly _events = new Map<string, any>()
  public cancelChat = false

  public constructor() {
    super()
    this.loadEvents()
  }

  public loadEvents(): void {
    for (const event of defaultEvents) {
      const Event = new event(this)
      this._events.set(Event.eventName, Event)
    }
  }

  public getEvents(): Map<string, any> {
    return this._events
  }
}

const events = new EventManager()

export { events }
