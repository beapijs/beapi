// Regular types.
import AbstractEvent from './AbstractEvent'
import { world, Player as IPlayer, EntityHitEvent } from 'mojang-minecraft'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI entity hit event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityHit extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityHit')
  public readonly name = 'EntityHit'

  // Predefined in AbstractEvent.
  @setProto('entityHit')
  public readonly iName = 'entityHit'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity hit event. Contains the logic
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
  protected __logic(data: EntityHitEvent): void {
    // If not hit entity then why are we here.
    if (!data.hitEntity) return
    // If hit entity is player ignore, we have a seperate event for this.
    if (data.hitEntity.id === 'minecraft:player') return

    // Attempt to get the attacker (can be undefined).
    const attacker =
      data.entity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.entity)
        : this._client.entities.getByIEntity(data.entity)

    // Attempt to get the targer hit entity.
    const target = this._client.entities.getByIEntity(data.hitEntity)

    // If no target return
    if (!target) return

    // Emit client event with event name.
    return this._client.emit(this.name, {
      attacker,
      target,
      weapon: attacker?.getInventory()?.getItem(attacker.getSelectedSlot()) ?? undefined,
    })
  }
}
