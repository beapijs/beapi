// Regular imports.
import { setProto, AbstractEvent, Client } from '..'
import { world, EntityHitEvent, Player as IPlayer } from 'mojang-minecraft'

/**
 * BeAPI player hit event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class PlayerHit extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('PlayerHit')
  public readonly name = 'PlayerHit'

  // Predefined in AbstractEvent.
  @setProto('entityHit')
  public readonly iName = 'entityHit'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI player hit event. Contains the logic
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
    // If hit entity is not a player then return.
    if (data.hitEntity.id !== 'minecraft:player') return

    // Attempt to get the attacker.
    const attacker =
      data.entity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.entity)
        : this._client.entities.getByIEntity(data.entity)

    // Attempt to get the vitim.
    const target = this._client.players.getByIPlayer(data.hitEntity as IPlayer)

    // If no target return.
    if (!target) return

    // Emit event to client.
    return this._client.emit(this.name, {
      attacker,
      target,
      weapon: attacker?.getInventory()?.getItem(attacker.getSelectedSlot()) ?? undefined,
    })
  }
}
