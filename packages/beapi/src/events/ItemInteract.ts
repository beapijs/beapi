// Normal imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'
import { Block } from '../block'
import { Item } from '../item'
import { BeforeItemUseOnEvent, world, Player as IPlayer } from 'mojang-minecraft'

// Type imports.
import type { Client } from '../client'

/**
 * BeAPI item interact event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ItemInteract extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ItemInteract')
  public readonly name = 'ItemInteract'

  // Predefined in AbstractEvent.
  @setProto('beforeItemUseOn')
  public readonly iName = 'beforeItemUseOn'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI item interact event. Contains the logic
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
  protected __logic(arg: BeforeItemUseOnEvent): void {
    // Emit de blok event.
    this._client.emit(this.name, {
      source:
        arg.source instanceof IPlayer
          ? this._client.players.getByIPlayer(arg.source)
          : this._client.entities.getByIEntity(arg.source),
      item: new Item(this._client, arg.item) ?? undefined,
      block: new Block(this._client, arg.source.dimension.getBlock(arg.blockLocation)),
      blockLocation: arg.blockLocation,
      faceLocationX: arg.faceLocationX,
      faceLocationY: arg.faceLocationY,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
