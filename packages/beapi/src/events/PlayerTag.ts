import type { Client } from '../client'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class PlayerTag extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('PlayerTag')
  public readonly name = 'PlayerTag'

  @setProto('custom')
  public readonly iName = 'custom'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('Tick', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('Tick', this._logic)
    }
  }

  protected __logic(): void {
    for (const [, player] of this._client.players.getAll()) {
      try {
        for (const tag of player.getTags()) {
          if (!tag.startsWith('beapi:')) continue
          player.removeTag(tag)
          this._client.emit(this.name, {
            player,
            tag: tag.replace('beapi:', ''),
          })
        }
      } catch {}
    }
  }
}
