import { World } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'
import { Entity } from '../../entity/Entity.js'

export class EntityCreate {
  private _events: EventManager
  public eventName = 'EntityCreate'

  constructor (events: EventManager) {
    this._events = events
    World.events.entityCreate.subscribe(async (data) => {
      if (data.entity.id == "minecraft:player") return

      return this._events.emit('EntityCreate', new Entity(data.entity))
    })
  }
}
