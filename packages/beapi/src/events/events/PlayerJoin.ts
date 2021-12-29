import { world } from 'mojang-minecraft'
import type { EventManager } from '../EventManager.js'
import { Player } from '../../player/Player.js'

export class PlayerJoin {
  private readonly _events: EventManager
  public eventName = 'PlayerJoin'

  public constructor(events: EventManager) {
    this._events = events
    world.events.playerJoin.subscribe((data) => {
      this._events.emit('PlayerJoin', new Player(data.player))
    })
  }
}
