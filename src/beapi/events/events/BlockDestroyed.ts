import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'

export class BlockDestroyed {
  private _events: EventManager
  public eventName = 'BlockDestroyed'

  constructor (events: EventManager) {
    this._events = events
    this._events.on("OldEvent", (data) => {
      if (data.event !== "BlockDestroyed") return
      const player = players.getPlayerByNameTag(data.player)
      const block = data.block
      this._events.emit("BlockDestroyed", {
        player: player,
        block: block,
      })
    })
  }
}
