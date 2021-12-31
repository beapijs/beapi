import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerIsSwimming {
  private readonly _events: EventManager
  public eventName = 'PlayerIsSwimming'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:on_swim')) continue
        player.removeTag('beapi:on_swim')

        return this._events.emit('PlayerIsSwimming', player)
      }
    })
  }
}
