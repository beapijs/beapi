import type { Client, Player } from '..'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class ItemDropped extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('ItemDropped')
  public readonly name = 'ItemDropped'

  @setProto('custom')
  public readonly iName = 'custom'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('Swing', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('Swing', this._logic)
    }
  }

  protected __logic(data: Player): void {
    const block = this._client.world.getBlock(data.getLocation(), data.getDimensionName())
    const entity = this._client.entities.getLastest()
    if (!entity || entity?.getId() !== 'minecraft:item' || block.getId() !== 'minecraft:air') return
    this._client.emit(this.name, {
      player: data,
      item: entity,
    })
  }
}
