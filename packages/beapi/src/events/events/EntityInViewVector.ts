import type { EventManager } from '../EventManager.js'
import { entities } from '../../entity/EntityManager.js'
import { players } from '../../player/PlayerManager.js'

export class EntityInViewVector {
  private readonly _events: EventManager
  public eventName = 'EntityInViewVector'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      for (const [, player] of players.getPlayerList()) {
        const entity = player.getVanilla().getEntitiesFromViewVector()[0]
        if (!entity || entity.id === 'minecraft:player') return
        const target = entities.getEntityByVanilla(entity)
        if (!target) return
        player.setPreviosEntityViewVector(target)

        return this._events.emit('EntityInViewVector', {
          player: player,
          target: target,
        })
      }
    })
  }
}
