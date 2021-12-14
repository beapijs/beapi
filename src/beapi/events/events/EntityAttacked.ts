import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class EntityAttacked {
  private _events: EventManager
  public eventName = 'EntityAttacked'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("OldEvent", (data) => {
      if (data.event !== "EntityAttacked") return
      const player = players.getPlayerByNameTag(data.player)
      const entity = data.entity
      console.warn(JSON.stringify(data))
      this._events.emit("EntityAttacked", {
        player: player,
        entity: entity,
      })
    })
  }
}
