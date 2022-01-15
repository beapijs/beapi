import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerJump {
  private readonly _events: EventManager
  public eventName = 'PlayerJump'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:jump')) continue
        player.removeTag('beapi:jump')

        return this._events.emit('PlayerJump', player)
      }
    })
  }
}
