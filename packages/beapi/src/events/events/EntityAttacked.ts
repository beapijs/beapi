import type { EventManager } from '../EventManager.js'
import { entities } from '../../entity/EntityManager.js'

export class EntityAttacked {
  private readonly _events: EventManager
  public eventName = 'EntityAttacked'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('PlayerSwing', (player) => {
      const entity = player.getVanilla().getEntitiesFromViewVector()[0]
      if (!entity || entity.id === 'minecraft:player') return
      const target = entities.getEntityByVanilla(entity)
      if (!target) return

      return this._events.emit('EntityAttacked', {
        attacker: player,
        target: target,
      })
    })
  }
}
