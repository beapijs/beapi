import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerUnsneak {
  private readonly _events: EventManager
  public eventName = 'PlayerUnsneak'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:unsneak')) continue
        player.removeTag('beapi:unsneak')

        return this._events.emit('PlayerUnsneak', player)
      }
    })
  }
}
