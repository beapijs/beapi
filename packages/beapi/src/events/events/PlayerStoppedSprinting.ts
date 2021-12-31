import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerStoppedSprinting {
  private readonly _events: EventManager
  public eventName = 'PlayerStoppedSprinting'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:off_sprint')) continue
        player.removeTag('beapi:off_sprint')

        return this._events.emit('PlayerStoppedSprinting', player)
      }
    })
  }
}
