// Regular imports.
import AbstractEvent from './AbstractEvent'
import { EffectAddEvent, world, Player as IPlayer } from 'mojang-minecraft'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI effect added event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EffectAdded extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EffectAdded')
  public readonly name = 'EffectAdded'

  // Predefined in AbstractEvent.
  @setProto('effectAdd')
  public readonly iName = 'effectAdd'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI effect added event. Contains the logic
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
      world.events[this.iName].subscribe(this._logic)
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
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(arg: EffectAddEvent): void {
    // Emit dee effect event yuh.
    this._client.emit(this.name, {
      // Target can be entity or player and it has a change
      // of being undefined cause Minecraft.
      target:
        arg.entity instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.entity)
          : this._client.entities.getByIEntity(arg.entity),
      effect: arg.effect,
      state: arg.effectState,
    })
  }
}
