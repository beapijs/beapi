import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerStoppedMoving {
  private readonly _events: EventManager
  public eventName = 'PlayerStoppedMoving'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:off_move')) continue
        player.removeTag('beapi:off_move')

        return this._events.emit('PlayerStoppedMoving', player)
      }
    })
  }
}
