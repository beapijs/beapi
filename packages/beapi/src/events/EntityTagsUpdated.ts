import type { Client } from '../client'
import type { Entity } from '../entity'

import AbstractEvent from './AbstractEvent'
export class EntityTagsUpdated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false
  protected readonly oldTags = new Map<Entity, string[]>()
  protected ignoreNextAdd = false
  protected ignoreNextRemove = false

  public readonly name = 'EntityTagsUpdated'
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
    for (const [, entity] of this._client.entities.getAll()) {
      const tags = entity.getTags().filter((x) => !x.startsWith('beapi:'))
      if (!this.oldTags.has(entity)) {
        this.oldTags.set(entity, tags)
        continue
      }
      for (const old of this.oldTags?.get(entity) ?? []) {
        const tag = tags.find((x) => x === old)
        if (tag) continue

        if (this.ignoreNextRemove) {
          this.ignoreNextRemove = false
          continue
        }

        this._client.emit(this.name, {
          entity,
          tag: old,
          method: 'remove',
          cancel: () => {
            entity.addTag(old)
            this.ignoreNextAdd = true
          },
        })
      }
      for (const current of tags) {
        const tag = this.oldTags.get(entity)?.find((x) => x === current)
        if (tag) continue

        if (this.ignoreNextAdd) {
          this.ignoreNextAdd = false
          continue
        }

        this._client.emit(this.name, {
          entity,
          tag: current,
          method: 'add',
          cancel: () => {
            entity.removeTag(current)
            this.ignoreNextRemove = true
          },
        })
      }

      this.oldTags.set(entity, tags)
    }
  }
}
