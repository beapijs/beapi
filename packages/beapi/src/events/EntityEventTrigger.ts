import { world, Player as IPlayer, BeforeDataDrivenEntityTriggerEvent } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class EntityEventTrigger extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'EntityEventTrigger'
  public readonly iName = 'beforeDataDrivenEntityTriggerEvent'
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

  protected __logic(arg: BeforeDataDrivenEntityTriggerEvent): void {
    if (arg.entity instanceof IPlayer) return
    const entity = this._client.entities.getByIEntity(arg.entity)! // Cannot Not Exist
    this._client.emit(this.name, {
      entity,
      event: arg.id,
      data: arg.modifiers,
      cancel: () => {
        arg.cancel = true
      },
    })
  }
}
