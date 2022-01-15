import { PlayerLeaveEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class OnLeave extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'OnLeave'
  public readonly iName = 'playerLeave'
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

  protected __logic(arg: PlayerLeaveEvent): void {
    const player = this._client.players.getByName(arg.playerName)
    if (player) player.destroy()

    this._client.emit(this.name, player ?? arg.playerName)
  }
}
