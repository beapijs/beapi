import { BeforeExplosionEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class Explosion extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('Explosion')
  public readonly name = 'Explosion'

  @setProto('beforeExplosion')
  public readonly iName = 'beforeExplosion'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      world.events[this.iName].subscribe(this._logic)
      this._registered = true
    }
  }

  public off(): void {
    if (this._registered) {
      world.events[this.iName].unsubscribe(this._logic)
      this._registered = false
    }
  }

  protected __logic(arg: BeforeExplosionEvent): void {
    if (this.alwaysCancel) {
      arg.cancel = true
      return
    }
    const entity = this._client.entities.getByIEntity(arg.source)
    this._client.emit(this.name, {
      source: entity,
      dimension: arg.dimension,
      impactedBlocks: arg.impactedBlocks,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
