import { BeforeItemDefinitionTriggeredEvent, world, Player } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class ItemEvent extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'ItemEvent'
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
    const player = this._client.players.getByIPlayer(arg.source as Player)
    this._client.emit(this.name, {
      player: player,
      item: arg.item,
      event: arg.eventName,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
