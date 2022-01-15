import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { world } from 'mojang-minecraft'
import type { BlockEvent } from '../../@types/BeAPI.i'
import type { Player } from '../../index.js'

const w = world as any // TODO: Change once docs are updated

export class BlockPlaced {
  private readonly _events: EventManager
  public eventName = 'BlockPlaced'
  // @ts-expect-error We don't care about "ts(2564)"
  private prev: {
    player: Player
    data: BlockEvent
  }

  public constructor(events: EventManager) {
    this._events = events
    w.events.blockPlace.subscribe((data: BlockEvent) => {
      const player = players.getPlayerByVanilla(data.player)
      if (!player) return
      this.prev = {
        player,
        data,
      }

      return this._events.emit('BlockPlaced', {
        player: player,
        block: data.block,
        cancelEvent: this.cancel.bind(this),
      })
    })
  }

  private cancel(): void {
    const dim = this.prev.data.block.dimension
    const pos = this.prev.data.block.location
    if (this.prev.player.getGamemode() === 'creative') {
      dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air`)
    } else {
      dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air 0 destroy`)
    }
  }
}
