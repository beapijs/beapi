import { EffectAddEvent, world, Player as IPlayer } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class EffectAdded extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('EffectAdded')
  public readonly name = 'EffectAdded'

  @setProto('effectAdd')
  public readonly iName = 'effectAdd'

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

  protected __logic(arg: EffectAddEvent): void {
    this._client.emit(this.name, {
      target:
        arg.entity instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.entity)
          : this._client.entities.getByIEntity(arg.entity),
      effect: arg.effect,
      state: arg.effectState,
    })
  }
}
