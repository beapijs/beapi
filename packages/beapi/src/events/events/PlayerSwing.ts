import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerSwing {
  private readonly _events: EventManager
  public eventName = 'PlayerSwing'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:swing')) continue
        player.removeTag('beapi:swing')

        return this._events.emit('PlayerSwing', player)
      }
    })
  }
}
