import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerIsMoving {
  private readonly _events: EventManager
  public eventName = 'PlayerIsMoving'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:on_move')) continue
        player.removeTag('beapi:on_move')

        return this._events.emit('PlayerIsMoving', player)
      }
    })
  }
}
