import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerExitWater {
  private readonly _events: EventManager
  public eventName = 'PlayerExitWater'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:exit_water')) continue
        player.removeTag('beapi:exit_water')

        return this._events.emit('PlayerExitWater', player)
      }
    })
  }
}
