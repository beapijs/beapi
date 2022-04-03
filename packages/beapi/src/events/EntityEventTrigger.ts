// Regular imports.
import AbstractEvent from './AbstractEvent'
import { world, Player as IPlayer, BeforeDataDrivenEntityTriggerEvent } from 'mojang-minecraft'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI entity event trigger event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityEventTrigger extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityEventTrigger')
  public readonly name = 'EntityEventTrigger'

  // Predefined in AbstractEvent.
  @setProto('beforeDataDrivenEntityTriggerEvent')
  public readonly iName = 'beforeDataDrivenEntityTriggerEvent'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity event trigger event. Contains the logic
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
    // If entity is instance of a player we dont want.
    if (arg.entity instanceof IPlayer) return

    // Try to get the entity from entity manager.
    const entity = this._client.entities.getByIEntity(arg.entity)

    // If not entity then return.
    if (!entity) return

    // Otherwise emit event event trigger through client.
    this._client.emit(this.name, {
      entity,
      event: arg.id,
      data: arg.modifiers,
      cancel: () => {
        arg.cancel = true
      },
    })
  }
}
