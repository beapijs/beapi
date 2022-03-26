import type { Client } from '../client'
import type { Player } from '../player'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class PlayerTagsUpdated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false
  protected readonly oldTags = new Map<Player, string[]>()
  protected ignoreNextAdd = false
  protected ignoreNextRemove = false

  @setProto('PlayerTagsUpdated')
  public readonly name = 'PlayerTagsUpdated'

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
      const tags = player.getTags().filter((x) => !x.startsWith('beapi:'))
      if (!this.oldTags.has(player)) {
        this.oldTags.set(player, tags)
        continue
      }
      for (const old of this.oldTags?.get(player) ?? []) {
        const tag = tags.find((x) => x === old)
        if (tag) continue

        if (this.ignoreNextRemove) {
          this.ignoreNextRemove = false
          continue
        }

        this._client.emit(this.name, {
          player,
          tag: old,
          method: 'remove',
          cancel: () => {
            player.addTag(old)
            this.ignoreNextAdd = true
          },
        })
      }
      for (const current of tags) {
        const tag = this.oldTags.get(player)?.find((x) => x === current)
        if (tag) continue

        if (this.ignoreNextAdd) {
          this.ignoreNextAdd = false
          continue
        }

        this._client.emit(this.name, {
          player,
          tag: current,
          method: 'add',
          cancel: () => {
            player.removeTag(current)
            this.ignoreNextRemove = true
          },
        })
      }

      this.oldTags.set(player, tags)
    }
  }
}
