import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerLanded {
  private readonly _events: EventManager
  public eventName = 'PlayerLanded'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:land')) continue
        player.removeTag('beapi:land')

        return this._events.emit('PlayerLanded', player)
      }
    })
  }
}
