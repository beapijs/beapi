import { World } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'
import { Player } from '../../player/Player.js'

export class PlayerJoin {
  private _events: EventManager
  public eventName = 'PlayerJoin'

  constructor (events: EventManager) {
    this._events = events
    World.events.entityCreate.subscribe(async (data) => {
      if (data.entity.id != "minecraft:player") return

      const players = World.getPlayers()
      players.forEach((x) => {
        if (x.nameTag != data.entity.nameTag) return
       
        return this._events.emit('PlayerJoin', new Player(x))
      })
    })
  }
}
