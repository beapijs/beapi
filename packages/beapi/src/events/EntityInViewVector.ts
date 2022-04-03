// Regular imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI entity in view vector event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
// TODO: Remove this iirc.
export class EntityInViewVector extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityInViewVector')
  public readonly name = 'EntityInViewVector'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity in view vector event. Contains the logic
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
    // For every player in player manager, iterate.
    for (const [, player] of this._client.players.getAll()) {
      try {
        // Try get first entity in player view vector.
        const entity = player.getIPlayer().getEntitiesFromViewVector()[0]
        // If not entity (or player) continue to next iteration.
        if (!entity || entity.id === 'minecraft:player') continue

        // Attempt to get the targeted entity from entity manager.
        const target = this._client.entities.getByIEntity(entity)
        // If not targeted continue to next iteration.
        if (!target) continue

        // Emit entity in view vector event on client.
        this._client.emit(this.name, {
          player,
          target,
        })
      } catch {}
    }
  }
}
