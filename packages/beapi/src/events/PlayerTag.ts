// Regular imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI player tag event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class PlayerTag extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('PlayerTag')
  public readonly name = 'PlayerTag'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI player tag event. Contains the logic
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
        // For every tag the player has, iterate.
        for (const tag of player.getTags()) {
          // If tag does not start with "beapi:" continue to next itr.
          if (!tag.startsWith('beapi:')) continue
          // Remove tag from player.
          player.removeTag(tag)
          // Emit event to client.
          this._client.emit(this.name, {
            player,
            // Remove "beapi:" from tag.
            tag: tag.replace('beapi:', ''),
          })
        }
      } catch {}
    }
  }
}
