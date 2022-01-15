import { world } from 'mojang-minecraft'
import type { EventManager } from '../EventManager.js'

export class Explosion {
  private readonly _events: EventManager
  public eventName = 'Explosion'

  public constructor(events: EventManager) {
    this._events = events
    world.events.beforeExplosion.subscribe((data) => {
      this._events.emit('Explosion', {
        dimension: data.dimension,
        source: data.source,
        impactedBlocks: data.impactedBlocks,
      })
    })
  }
}
