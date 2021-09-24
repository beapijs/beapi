import { World } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'

export class EntityCreate {
  private _events: EventManager
  public eventName = 'EntityCreate'

  constructor (events: EventManager) {
    this._events = events
    World.events.entityCreate.subscribe(async (data) => {
      return this._events.emit('EntityCreate', data.entity)
    })
  }
}
