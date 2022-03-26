import type { Client } from '../client'
import type { Player as IPlayer, EntityHitEvent } from 'mojang-minecraft'
import { setProto } from '../'
import { world } from 'mojang-minecraft'

import AbstractEvent from './AbstractEvent'
export class BlockHit extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('BlockHit')
  public readonly name = 'BlockHit'

  @setProto('entityHit')
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

  protected __logic(data: EntityHitEvent): void {
    if (!data.hitBlock) return
    const player = this._client.players.getByIPlayer(data.entity as IPlayer)! // Cannot Not Exist
    const block = data.hitBlock

    return this._client.emit(this.name, {
      player,
      block,
      tool: player.getInventory().container.getItem(player.getSelectedSlot()),
    })
  }
}
