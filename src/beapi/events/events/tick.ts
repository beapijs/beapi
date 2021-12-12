import { world } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'

export class Tick {
  private _events: EventManager
  public eventName = 'tick'
  public ticks = 0

  constructor (events: EventManager) {
    this._events = events
    world.events.tick.subscribe(() => {
      this.ticks++
      this._events.emit('tick', this.ticks)
    })
  }
  public getTicks(): number { return this.ticks }
}
