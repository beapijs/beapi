import { world, Block as IBlock, Dimension as IDimension } from 'mojang-minecraft'
import type { Client } from '../client'
import { Block } from '../block'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'

export interface LeverActivateEvent {
  block: IBlock
  dimension: IDimension
  isPowered: boolean
}

export class Lever extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('Lever')
  public readonly name = 'Lever'

  @setProto('leverActivate')
  public readonly iName = 'leverActivate'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      // @ts-ignore
      world.events[this.iName].subscribe(this._logic)
      this._registered = true
    }
  }

  public off(): void {
    if (this._registered) {
      // @ts-ignore
      world.events[this.iName].unsubscribe(this._logic)
      this._registered = false
    }
  }

  // TODO: added cancel method
  protected __logic(arg: LeverActivateEvent): void {
    this._client.emit(this.name, {
      block: new Block(this._client, arg.block),
      dimension: arg.dimension,
      powered: arg.isPowered,
    })
  }
}
