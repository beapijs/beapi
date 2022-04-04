// Normal imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'
import { world, Player as IPlayer, BeforeDataDrivenEntityTriggerEvent } from 'mojang-minecraft'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI player event trigger event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class PlayerEventTrigger extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('PlayerEventTrigger')
  public readonly name = 'PlayerEventTrigger'

  // Predefined in AbstractEvent.
  @setProto('beforeDataDrivenEntityTriggerEvent')
  public readonly iName = 'beforeDataDrivenEntityTriggerEvent'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI player event trigger event. Contains the logic
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
  protected __logic(arg: BeforeDataDrivenEntityTriggerEvent): void {
    // If not instance of player we dont care.
    if (!(arg.entity instanceof IPlayer)) return

    // Try to get the player from player manager.
    const player = this._client.players.getByIPlayer(arg.entity)

    // If no player return.
    if (!player) return

    // Emit the client event.
    this._client.emit(this.name, {
      player,
      event: arg.id,
      data: arg.modifiers,
      cancel: () => {
        arg.cancel = true
      },
    })
  }
}
