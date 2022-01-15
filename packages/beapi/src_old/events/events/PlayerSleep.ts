import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerSleep {
  private readonly _events: EventManager
  public eventName = 'PlayerSleep'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:sleep')) continue
        player.removeTag('beapi:sleep')

        return this._events.emit('PlayerSleep', player)
      }
    })
  }
}
