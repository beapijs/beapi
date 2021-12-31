import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerSneak {
  private readonly _events: EventManager
  public eventName = 'PlayerSneak'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:sneak')) continue
        player.removeTag('beapi:sneak')

        return this._events.emit('PlayerSneak', player)
      }
    })
  }
}
