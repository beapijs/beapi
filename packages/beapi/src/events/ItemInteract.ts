import { BeforeItemUseOnEvent, world, Player as IPlayer } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class ItemInteract extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'ItemInteract'
  public readonly iName = 'beforeItemUseOn'
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

  protected __logic(arg: BeforeItemUseOnEvent): void {
    this._client.emit(this.name, {
      source:
        arg.source instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.source)
          : this._client.entities.getByIEntity(arg.source),
      item: arg.item,
      block: arg.source.dimension.getBlock(arg.blockLocation),
      blockLocation: arg.blockLocation,
      faceLocationX: arg.faceLocationX,
      faceLocationY: arg.faceLocationY,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
