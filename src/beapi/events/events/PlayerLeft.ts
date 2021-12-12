import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { world } from 'mojang-minecraft'

export class PlayerLeft {
  private _events: EventManager
  public eventName = 'PlayerLeft'

  constructor (events: EventManager) {
    this._events = events
    world.events.playerLeave.subscribe(async (data) => {
      const player = players.getPlayerByName(data.playerName)

      return this._events.emit('PlayerLeft', player)
    })
  }
}
