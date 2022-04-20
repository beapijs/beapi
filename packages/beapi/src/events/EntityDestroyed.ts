// Regular imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI entity destroyed event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityDestroyed extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityDestroyed')
  public readonly name = 'EntityDestroyed'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity destroyed event. Contains the logic
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
      // TEMP: Mojang Needs To Add Entity Destroyed Event
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
      // TEMP: Mojang Needs To Add Entity Destroyed Event
      this._client.removeListener('Tick', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(): void {
    // For every entity in the entity manager interate.
    for (const [, entity] of this._client.entities.getAll()) {
      // Try to get the entities id. If it returns an error
      // (which it will when its dead as you are trying to access
      // released memory through a now invalidated pointer)
      // Then emit the death event on the entity and remove it
      // from the entity manager
      try {
        entity.getIEntity().id
      } catch {
        this._client.emit(this.name, entity)
        this._client.entities.remove(entity)
      }
    }
  }
}
