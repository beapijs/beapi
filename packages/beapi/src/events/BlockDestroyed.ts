import { world, BlockBreakEvent } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class BlockDestroyed extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'BlockDestroyed'
  public readonly iName = 'blockBreak'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      world.events[this.iName].subscribe(this._logic)
      this._registered = true
    }
  }

  public off(): void {
    if (this._registered) {
      world.events[this.iName].unsubscribe(this._logic)
      this._registered = false
    }
  }

  protected __logic(arg: BlockBreakEvent): void {
    const player = this._client.players.getByIPlayer(arg.player)
    if (!player) return

    this._client.emit(this.name, {
      player,
      block: arg.block,
      brokenBlock: arg.brokenBlockPermutation,
      dimension: arg.dimension,
      cancel() {
        // TEMP: Workaround Until Mojang Adds Block Destroyed Cancel Event
        arg.block.setPermutation(arg.brokenBlockPermutation)
      },
    })
  }
}
