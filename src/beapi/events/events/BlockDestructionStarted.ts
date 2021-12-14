import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class BlockDestructionStarted {
  private _events: EventManager
  public eventName = 'BlockDestructionStarted'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("OldEvent", (data) => {
      if (data.event !== "BlockDestructionStarted") return
      const player = players.getPlayerByNameTag(data.player)
      const block = data.block
      this._events.emit("BlockDestructionStarted", {
        player: player,
        block: block,
      })
    })
  }
}
