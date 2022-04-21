// Regular imports.
import { setProto, AbstractEvent, Client } from '..'
import { world, Player as IPlayer, Entity as IEntity, EntityHurtEvent } from 'mojang-minecraft'

/**
 * BeAPI player hurt event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class PlayerHurt extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('PlayerHurt')
  public readonly name = 'PlayerHurt'

  // Predefined in AbstractEvent.
  @setProto('entityHurt')
  public readonly iName = 'entityHurt'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI player hurt event. Contains the logic
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
      // @ts-ignore TEMP: util Minecraft typings are updated.
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(data: EntityHurtEvent): void {
    // If not a player return we dont care.
    if (data.hurtEntity.id !== 'minecraft:player') return

    // Attempt to get the attacker entity | player | undefined.
    const attacker =
      data.damagingEntity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.damagingEntity)
        : this._client.entities.getByIEntity(data.damagingEntity)

    // Attempt to get the target.
    const target = this._client.players.getByIPlayer(data.hurtEntity as IPlayer)

    // If no target return.
    if (!target) return

    // Attempt to get the projective if used.
    const projectile =
      data.projectile instanceof IEntity ? this._client.entities.getByIEntity(data.projectile) : undefined

    // Emit client wrapped event.
    return this._client.emit(this.name, {
      attacker,
      target,
      weapon: attacker?.getInventory()?.getItem(attacker.getSelectedSlot()) ?? undefined,
      damage: data.damage,
      cause: data.cause,
      projectile,
    })
  }
}
