import { world } from 'mojang-minecraft'
import type { EventManager } from '../EventManager.js'
import { Entity } from '../../entity/Entity.js'

export class EntityCreate {
  private readonly _events: EventManager
  public eventName = 'EntityCreate'

  public constructor(events: EventManager) {
    this._events = events
    world.events.entityCreate.subscribe((data) => {
      if (data.entity.id === 'minecraft:player') return

      return this._events.emit('EntityCreate', new Entity(data.entity))
    })
  }
}
