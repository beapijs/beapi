import { world } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'
import { Player } from '../../player/Player.js'

export class PlayerJoin {
  private _events: EventManager
  public eventName = 'PlayerJoin'

  constructor (events: EventManager) {
    this._events = events
    world.events.playerJoin.subscribe(async (data) => {
      this._events.emit('PlayerJoin', new Player(data.player))
    })
  }
}
