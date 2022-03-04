import type { Client } from '../client'
import type { Player as IPlayer, Block } from 'mojang-minecraft'
import { world } from 'mojang-minecraft'

import AbstractEvent from './AbstractEvent'
export class BlockHit extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'BlockHit'
  public readonly iName = 'entityHit'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      world.events[this.iName].subscribe(this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      world.events[this.iName].unsubscribe(this._logic)
    }
  }

  protected __logic(data: any): void {
    if (!data.hitBlock) return
    const player = this._client.players.getByIPlayer(data.entity as IPlayer)
    const block = data.hitBlock as Block

    return this._client.emit(this.name, {
      player,
      block,
      tool: player.getInventory().container.getItem(player.getSelectedSlot()),
    })
  }
}
