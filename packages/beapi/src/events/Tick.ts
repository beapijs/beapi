// Normal imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import { TickEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'

/**
 * BeAPI tick event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class Tick extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('Tick')
  public readonly name = 'Tick'

  // Predefined in AbstractEvent.
  @setProto('tick')
  public readonly iName = 'tick'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI tick event. Contains the logic
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
  protected __logic(arg: TickEvent): void {
    // Emit the event through client.
    this._client.emit(this.name, {
      currentTick: arg.currentTick,
      deltaTime: arg.deltaTime,
    })
  }
}
