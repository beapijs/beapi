import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class BlockDestructionStopped {
  private _events: EventManager
  public eventName = 'BlockDestructionStopped'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("OldEvent", (data) => {
      if (data.event !== "BlockDestructionStopped") return
      const player = players.getPlayerByNameTag(data.player)
      const block = data.block
      this._events.emit("BlockDestructionStopped", {
        player: player,
        block: block,
      })
    })
  }
}
