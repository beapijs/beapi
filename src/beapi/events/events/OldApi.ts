import { EventManager } from '../EventManager.js'
import { entities } from '../../entity/EntityManager.js'

export class OldApi {
  private _events: EventManager
  public eventName = 'OldApi'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("tick", () => {
      for (const [, entity] of entities.getEntityList()) {
        if (entity.getId() !== "minecraft:armor_stand" || !entity.getVanilla().nameTag.startsWith('{"beapi"')) return
        this._events.emit("OldEvent", JSON.parse(entity.getVanilla().nameTag).beapi)
        entity.destroy()
      }
    })
  }
}
