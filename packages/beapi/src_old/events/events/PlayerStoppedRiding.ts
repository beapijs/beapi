import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerStoppedRiding {
  private readonly _events: EventManager
  public eventName = 'PlayerStoppedRiding'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:off_ride')) continue
        player.removeTag('beapi:off_ride')

        return this._events.emit('PlayerStoppedRiding', player)
      }
    })
  }
}
