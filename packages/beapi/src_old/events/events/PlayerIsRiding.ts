import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerIsRiding {
  private readonly _events: EventManager
  public eventName = 'PlayerIsRiding'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:on_ride')) continue
        player.removeTag('beapi:on_ride')

        return this._events.emit('PlayerIsRiding', player)
      }
    })
  }
}
