import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerStoppedSwimming {
  private readonly _events: EventManager
  public eventName = 'PlayerStoppedSwimming'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:off_swim')) continue
        player.removeTag('beapi:off_swim')

        return this._events.emit('PlayerStoppedSwimming', player)
      }
    })
  }
}
