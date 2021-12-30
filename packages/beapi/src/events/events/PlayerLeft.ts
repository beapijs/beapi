import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { world } from 'mojang-minecraft'

export class PlayerLeft {
  private readonly _events: EventManager
  public eventName = 'PlayerLeft'

  public constructor(events: EventManager) {
    this._events = events
    world.events.playerLeave.subscribe((data) => {
      const player = players.getPlayerByName(data.playerName)
      if (!player) return
      players.removePlayer(player)

      return this._events.emit('PlayerLeft', player)
    })
  }
}
