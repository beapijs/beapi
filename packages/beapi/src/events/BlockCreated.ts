import { world } from 'mojang-minecraft'
import type { Client } from '../client'
import type { BlockEvent } from '../types'

import AbstractEvent from './AbstractEvent'
export class BlockCreated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'BlockCreated'
  public readonly iName = 'blockPlace'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      // TEMP: Mojang Needs To Update Typings
      ;(world.events as any)[this.iName].subscribe(this._logic)
      // if (world.events.hasOwnProperty('blockPlace')) {}
      this._registered = true
    }
  }

  public off(): void {
    if (this._registered) {
      // TEMP: Mojang Needs To Update Typings
      ;(world.events as any)[this.iName].unsubscribe(this._logic)
      this._registered = false
    }
  }

  protected __logic(arg: BlockEvent): void {
    const player = this._client.players.getByIPlayer(arg.player)
    if (!player) return

    this._client.emit(this.name, {
      player,
      block: arg.block,
      dimension: arg.dimension,
      cancel() {
        // TEMP: Workaround Until Mojang Adds Block Placed Cancel Event
        const dim = arg.dimension
        const pos = arg.block.location
        if (player.getGamemode() === 'creative') {
          dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air`)
        } else {
          dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air 0 destroy`)
        }
      },
    })
  }
}
