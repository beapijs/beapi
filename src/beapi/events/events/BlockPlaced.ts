import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class BlockPlaced {
  private _events: EventManager
  public eventName = 'BlockPlaced'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("OldEvent", (data) => {
      if (data.event !== "BlockPlaced") return
      const player = players.getPlayerByNameTag(data.player)
      const block = data.block
      this._events.emit("BlockPlaced", {
        player: player,
        block: block,
      })
    })
  }
}
