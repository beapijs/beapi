import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import {
  world,
} from 'mojang-minecraft'
import {
  BlockEvent,
} from '../../../types/BeAPI.i.js'

const w = world as any // TODO: Change once docs are updated

export class BlockDestroyed {
  private _events: EventManager
  public eventName = 'BlockDestroyed'
  private prev: BlockEvent

  constructor (events: EventManager) {
    this._events = events
    w.events.blockBreak.subscribe((data: BlockEvent) => {
      this.prev = data
      const player = players.getPlayerByVanilla(data.player)

      return this._events.emit("BlockDestroyed", {
        player: player,
        block: data.block,
        cancelEvent: this.cancel.bind(this),
      })
    })
  }
  private cancel(): void {
    const dim = this.prev.block.dimension
    const pos = this.prev.block.location
    dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} ${this.prev.block.id}`)
  }
}
