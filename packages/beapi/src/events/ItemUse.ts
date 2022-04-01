import { BeforeItemUseEvent, world, Player as IPlayer } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
import { Item } from '../item'
export class ItemUse extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('ItemUse')
  public readonly name = 'ItemUse'

  @setProto('beforeItemUse')
  public readonly iName = 'beforeItemUse'

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

  protected __logic(arg: BeforeItemUseEvent): void {
    this._client.emit(this.name, {
      source:
        arg.source instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.source)
          : this._client.entities.getByIEntity(arg.source),
      item: new Item(this._client, arg.item ?? undefined) ?? undefined,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
