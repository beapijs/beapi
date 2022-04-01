import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class EntityInViewVector extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('EntityInViewVector')
  public readonly name = 'EntityInViewVector'

  @setProto('custom')
  public readonly iName = 'custom'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('Tick', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('Tick', this._logic)
    }
  }

  protected __logic(): void {
    for (const [, player] of this._client.players.getAll()) {
      try {
        const entity = player.getIPlayer().getEntitiesFromViewVector()[0]
        if (!entity || entity.id === 'minecraft:player') continue
        const target = this._client.entities.getByIEntity(entity)
        if (!target) continue
        this._client.emit(this.name, {
          player,
          target,
        })
      } catch {}
    }
  }
}
