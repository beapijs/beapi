import type { EntityInViewVectorEvent } from '..'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class ItemDropped extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'ItemDropped'
  public readonly iName = 'custom'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('EntityAttacked', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('EntityAttacked', this._logic)
    }
  }

  protected __logic(data: EntityInViewVectorEvent): void {
    const block = this._client.world.getBlock(data.target.getLocation(), data.target.getDimensionName())
    if (data.target.getId() !== 'minecraft:item' || block.id !== 'minecraft:air') return

    this._client.emit(this.name, {
      player: data.player,
      item: data.target,
    })
  }
}
