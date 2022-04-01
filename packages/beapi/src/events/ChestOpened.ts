import type { ItemInteractEvent } from '..'
import type { Client } from '../client'
import { setProto } from '..'
import AbstractEvent from './AbstractEvent'
import { Entity } from '../entity'
import type { Player } from '../player'
export class ChestOpened extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('ChestOpened')
  public readonly name = 'ChestOpened'

  @setProto('custom')
  public readonly iName = 'custom'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('ItemInteract', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('ItemInteract', this._logic)
    }
  }

  protected __logic(data: ItemInteractEvent): void {
    if (!data.block.getInventory() || data.source instanceof Entity) return

    const type = data.block.getId().split(':')[1]
    this._client.emit(this.name, {
      block: data.block,
      player: data.source as Player,
      type,
      cancel: () => {
        data.cancel()
      },
    })
  }
}
