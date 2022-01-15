import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerIsSprinting {
  private readonly _events: EventManager
  public eventName = 'PlayerIsSprinting'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:on_sprint')) continue
        player.removeTag('beapi:on_sprint')

        return this._events.emit('PlayerIsSprinting', player)
      }
    })
  }
}
