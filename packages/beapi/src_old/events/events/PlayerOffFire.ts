import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerOffFire {
  private readonly _events: EventManager
  public eventName = 'PlayerOffFire'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag('beapi:off_fire')) continue
        player.removeTag('beapi:off_fire')

        return this._events.emit('PlayerOffFire', player)
      }
    })
  }
}
