import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerWake {
  private readonly _events: EventManager
  public eventName = 'PlayerWake'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:wake')) continue
        player.removeTag('beapi:wake')

        return this._events.emit('PlayerWake', player)
      }
    })
  }
}
