// Regular imports.
import AbstractEvent from './AbstractEvent'
import { world, Player as IPlayer, Entity as IEntity } from 'mojang-minecraft'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'

// FIXME: TEMP - util Minecraft typings are updated.
interface EntityHurtEvent {
  cause: string
  damage: number
  damagingEntity: IEntity
  hurtEntity: IEntity
  projectile?: IEntity
}

/**
 * BeAPI entity hurt event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityHurt extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityHurt')
  public readonly name = 'EntityHurt'

  // Predefined in AbstractEvent.
  @setProto('entityHurt')
  public readonly iName = 'entityHurt'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity hurt event. Contains the logic
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
      // @ts-ignore FIXME: TEMP - util Minecraft typings are updated.
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
      // @ts-ignore FIXME: TEMP - util Minecraft typings are updated.
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(data: EntityHurtEvent): void {
    // If hit entity is player ignore, we have a seperate event for this.
    if (data.hurtEntity.id === 'minecraft:player') return

    // Attempt to get the attacker (can be undefined).
    const attacker =
      data.damagingEntity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.damagingEntity)
        : this._client.entities.getByIEntity(data.damagingEntity)

    // Attempt to get the target hit entity.
    const target = this._client.entities.getByIEntity(data.hurtEntity)

    // If no target return.
    if (!target) return

    // Attempt to get projectile (can be undefined)
    const projectile =
      data.projectile instanceof IEntity ? this._client.entities.getByIEntity(data.projectile) : undefined

    // Emit entity hurt event.
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
