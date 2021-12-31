import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import type { Player } from 'mojang-minecraft'

export class PlayerInViewVector {
  private readonly _events: EventManager
  public eventName = 'PlayerInViewVector'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        const entity = player.getVanilla().getEntitiesFromViewVector()[0]
        if (!entity || entity.id !== 'minecraft:player') continue
        const target = players.getPlayerByVanilla(entity as Player)
        if (!target) continue
        player.setPreviousPlayerViewVector(target)
        this._events.emit('PlayerInViewVector', {
          player: player,
          target: target,
        })
      }
    })
  }
}
