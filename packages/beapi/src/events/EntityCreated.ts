import { world, Player as IPlayer, EntityCreateEvent } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class EntityCreated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'EntityCreated'
  public readonly iName = 'entityCreate'
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

  protected __logic(arg: EntityCreateEvent): void {
    if (arg.entity instanceof IPlayer) return
    const entity = this._client.entities.create(arg.entity)
    this._client.entities.add(entity)
    this._client.emit(this.name, entity)
  }
}
