import { BeforeItemDefinitionTriggeredEvent, world, Player } from 'mojang-minecraft'
import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
import { Item } from '../item'
export class ItemEvent extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('ItemEvent')
  public readonly name = 'ItemEvent'

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
    if (arg.source.id !== 'minecraft:player') return
    const player = this._client.players.getByIPlayer(arg.source as Player)! // Cannot Not Exist
    this._client.emit(this.name, {
      player: player,
      item: new Item(this._client, arg.item),
      event: arg.eventName,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
