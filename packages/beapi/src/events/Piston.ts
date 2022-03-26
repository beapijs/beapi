import { BeforePistonActivateEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class Piston extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('Piston')
  public readonly name = 'Piston'

  @setProto('beforePistonActivate')
  public readonly iName = 'beforePistonActivate'

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

  protected __logic(arg: BeforePistonActivateEvent): void {
    this._client.emit(this.name, {
      block: arg.block,
      dimension: arg.dimension,
      piston: arg.piston,
      extending: arg.isExpanding,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
