// Regular imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client, PlayerHurtEvent } from '..'

/**
 * BeAPI entity hurt event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class PlayerKilled extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('PlayerKilled')
  public readonly name = 'PlayerKilled'

  // Predefined in AbstractEvent.
  @setProto('PlayerKilled')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity hurt event. Contains the logic
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
      // Subscribe to Minecraft world event with IName
      // And use bound _logic for the callback.
      // @ts-ignore TEMP: util Minecraft typings are updated.
      this._client.addListener('PlayerHurt', this._logic)
      // Set registered to true so this cannot be called
      // Again before off being called.
      this._registered = true
    }
  }

  // Predefined in AbstractEvent.
  public off(): void {
    // If currently registered.
    if (this._registered) {
      // Remove Minecraft event listener on IName
      // With bound _logic callback.
      this._client.removeListener('PlayerHurt', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(data: PlayerHurtEvent): void {
    const health = data.target.getHealth()
    if (!health) return
    if (health.current > 0) return

    this._client.emit(this.name, {
      attacker: data.attacker,
      target: data.target,
      damage: data.damage,
      cause: data.cause,
    })
  }
}
