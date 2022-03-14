import { BeforeChatEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'

import AbstractEvent from './AbstractEvent'
export class OnChat extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'OnChat'
  public readonly iName = 'beforeChat'
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

  protected __logic(arg: BeforeChatEvent): void {
    if (arg.message.startsWith(this._client.commands.prefix)) return
    if (this.alwaysCancel) {
      arg.cancel = true
      return
    }
    const sender = arg.sender.name
      ? this._client.players.getByName(arg.sender.name)! // Cannot Not Exist
      : this._client.players.getByNameTag(arg.sender.nameTag)! // Cannot Not Exist

    if (sender.isMuted()) {
      arg.cancel = true
      this._client.emit(this.name, {
        sender,
        message: arg.message,
        cancel() {
          arg.cancel = true
        },
      })

      return
    }

    // TODO: Add methods to change targets
    this._client.emit(this.name, {
      sender,
      message: arg.message,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
