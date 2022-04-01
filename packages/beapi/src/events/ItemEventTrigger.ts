import { world, Player as IPlayer, BeforeItemDefinitionTriggeredEvent } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
import { Item } from '../item'
export class ItemEventTrigger extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('ItemEventTrigger')
  public readonly name = 'ItemEventTrigger'

  @setProto('beforeItemDefinitionEvent')
  public readonly iName = 'beforeItemDefinitionEvent'

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

  protected __logic(arg: BeforeItemDefinitionTriggeredEvent): void {
    this._client.emit(this.name, {
      source:
        arg.source instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.source)! /* Cannot Not Exist */
          : this._client.entities.getByIEntity(arg.source)! /* Cannot Not Exist */,
      event: arg.eventName,
      item: new Item(this._client, arg.item),
      cancel: () => {
        arg.cancel = true
      },
    })
  }
}
