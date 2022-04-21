// Regular imports.
import { setProto, AbstractEvent, Client, Entity } from '..'

/**
 * BeAPI entity tags updated event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityTagsUpdated extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Map of old tags per entity.
  protected readonly oldTags = new Map<Entity, string[]>()

  // Protected for ignoring next tag updates for player id.
  protected ignoreNextAddFor: Entity[] = []
  protected ignoreNextRemoveFor: Entity[] = []

  // Predefined in AbstractEvent.
  @setProto('EntityTagsUpdated')
  public readonly name = 'EntityTagsUpdated'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity tag updated event. Contains the logic
   * for translating Minecraft event data to BeAPI
   * wrapped data.
   * @param client Client referece.
   */
  public constructor(client: Client) {
    super()
    this._client = client
  }

  // Predefined in AbstractEvent.
  public on(): void {
    // If not already registered.
    if (!this._registered) {
      // Subscribe to Client event with needed logic
      // And use bound _logic for the callback.
      this._client.addListener('Tick', this._logic)
      // Set registered to true so this cannot be called
      // Again before off being called.
      this._registered = true
    }
  }

  // Predefined in AbstractEvent.
  public off(): void {
    // If currently registered.
    if (this._registered) {
      // Remove Client event listener used
      // With bound _logic callback.
      this._client.removeListener('Tick', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(): void {
    // For every entity in entity manager, iterate.
    for (const [, entity] of this._client.entities.getAll()) {
      // Get all non beapi tags on the player
      const tags = entity.getTags().filter((x) => !x.startsWith('beapi:'))

      // If old tags does not contain entity
      // Set them then continue to next iter.
      if (!this.oldTags.has(entity)) {
        this.oldTags.set(entity, tags)
        continue
      }

      // For each tag of the entities old tags iterate.
      for (const old of this.oldTags.get(entity) ?? []) {
        // Attempt to find old tag in current tags.
        const tag = tags.find((x) => x === old)
        // If it has tag continue.
        if (tag) continue

        // If ignore next, ignore this iteration
        if (this.ignoreNextRemoveFor.includes(entity)) {
          // Remove first occurance of their id in removeNextFor array.
          this.ignoreNextRemoveFor.splice(this.ignoreNextRemoveFor.indexOf(entity), 1)
          continue
        }

        this._client.emit(this.name, {
          entity,
          tag: old,
          method: 'remove',
          cancel: () => {
            entity.addTag(old)
            this.ignoreNextAddFor.push(entity)
          },
        })
      }
      // For each tag the player currently has.
      for (const current of tags) {
        // Attempt to get old tags for entity.
        const tag = this.oldTags.get(entity)?.find((x) => x === current)
        // If it has tag continue.
        if (tag) continue

        // If ignore next, ignore this iteration
        if (this.ignoreNextAddFor.includes(entity)) {
          // Remove first occurance of their id in removeNextFor array.
          this.ignoreNextAddFor.splice(this.ignoreNextAddFor.indexOf(entity), 1)
          continue
        }

        this._client.emit(this.name, {
          entity,
          tag: current,
          method: 'add',
          cancel: () => {
            entity.removeTag(current)
            this.ignoreNextRemoveFor.push(entity)
          },
        })
      }

      this.oldTags.set(entity, tags)
    }

    // Cleanup old entity tags to prevent possible memory leak
    for (const [entity] of this.oldTags) {
      // Try to get the entities id. If it returns an error
      // (which it will when its dead as you are trying to access
      // released memory through a now invalidated pointer)
      // The remove it from old scores.
      try {
        entity.getIEntity().id
      } catch {
        this.ignoreNextAddFor = this.ignoreNextAddFor.filter((i) => i !== entity)
        this.ignoreNextRemoveFor = this.ignoreNextRemoveFor.filter((i) => i !== entity)
        this.oldTags.delete(entity)
      }
    }
  }
}
