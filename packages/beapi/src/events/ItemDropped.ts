// Normal imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client, Player } from '..'

/**
 * BeAPI item dropped event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ItemDropped extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ItemDropped')
  public readonly name = 'ItemDropped'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI item dropped event. Contains the logic
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
      this._client.addListener('Swing', this._logic)
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
      this._client.removeListener('Swing', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  protected __logic(data: Player): void {
    // FIXME: This is pretty unreliable, throwing an item while facing a wall will void this.

    // Get block location of swing.
    const block = this._client.world.getBlock(data.getLocation(), data.getDimensionName())
    // Get latest entity.
    const entity = this._client.entities.getLastest()
    // If latest entity is not an item or block that was swung at was not air return.
    if (!entity || entity?.getId() !== 'minecraft:item' || block.getId() !== 'minecraft:air') return

    // Emit throw event.
    this._client.emit(this.name, {
      player: data,
      item: entity,
    })
  }
}
