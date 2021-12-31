import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerOnFire {
  private readonly _events: EventManager
  public eventName = 'PlayerOnFire'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:on_fire')) continue
        player.removeTag('beapi:on_fire')

        return this._events.emit('PlayerOnFire', player)
      }
    })
  }
}
