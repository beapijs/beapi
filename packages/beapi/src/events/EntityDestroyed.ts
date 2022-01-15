import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class EntityDestroyed extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'EntityDestroyed'
  public readonly iName = 'custom'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      // TEMP: Mojang Needs To Add Entity Destroyed Event
      this._client.addListener('Tick', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      // TEMP: Mojang Needs To Add Entity Destroyed Event
      this._client.removeListener('Tick', this._logic)
    }
  }

  protected __logic(): void {
    for (const [, entity] of this._client.entities.getAll()) {
      try {
        entity.getIEntity().id
      } catch {
        this._client.emit(this.name, entity)
        entity.destroy()
      }
    }
  }
}
