import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerInWater {
  private readonly _events: EventManager
  public eventName = 'PlayerInWater'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:in_water')) continue
        player.removeTag('beapi:in_water')

        return this._events.emit('PlayerInWater', player)
      }
    })
  }
}
