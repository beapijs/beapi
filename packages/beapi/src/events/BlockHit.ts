// Regular imports.
import { AbstractEvent, Block, setProto, Client } from '..'
import { world, Player as IPlayer, EntityHitEvent } from 'mojang-minecraft'

/**
 * BeAPI block hit event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class BlockHit extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('BlockHit')
  public readonly name = 'BlockHit'

  // Predefined in AbstractEvent.
  @setProto('entityHit')
  public readonly iName = 'entityHit'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI block hit event. Contains the logic
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
    // If was not a block hit we dont care, return.
    if (!data.hitBlock) return

    // Attempt to get the entity who hit the block as a player.
    const player = this._client.players.getByIPlayer(data.entity as IPlayer)

    // If no player then return.
    if (!player) return

    // Emit this event on client using name defined above.
    return this._client.emit(this.name, {
      player,
      block: new Block(this._client, data.hitBlock),
      tool: player.getInventory().getItem(player.getSelectedSlot()),
    })
  }
}
