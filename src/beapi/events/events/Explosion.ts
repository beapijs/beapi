import {
  world,
} from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'

export class Explosion {
  private _events: EventManager
  public eventName = 'Explosion'

  constructor (events: EventManager) {
    this._events = events
    world.events.beforeExplosion.subscribe(async (data) => {
      this._events.emit('Explosion', {
        dimension: data.dimension,
        source: data.source,
        impactedBlocks: data.impactedBlocks,
      })
    })
  }
}
