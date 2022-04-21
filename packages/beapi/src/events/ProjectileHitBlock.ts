// Regular imports.
import { setProto, AbstractEvent, Block, Client } from '..'
import {
  world,
  Player as IPlayer,
  Entity as IEntity,
  Block as IBlock,
  Dimension as IDimension,
  BlockLocation,
  Vector,
} from 'mojang-minecraft'

export interface ProjectileHitBlockEvent {
  dimension: IDimension
  location: BlockLocation
  hitVector: Vector
  entityHit?: IEntity | IPlayer
  blockHit?: IBlock
  source: IEntity | IPlayer
  projectile: IEntity
}

/**
 * BeAPI block hit event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ProjectileHitBlock extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ProjectileHitBlock')
  public readonly name = 'ProjectileHitBlock'

  // Predefined in AbstractEvent.
  @setProto('projectileHit')
  public readonly iName = 'projectileHit'

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
  protected __logic(data: ProjectileHitBlockEvent): void {
    // If was not a block hit we dont care, return.
    if (!data.blockHit) return

    // Emit this event on client using name defined above.
    return this._client.emit(this.name, {
      attacker:
        data.source instanceof IPlayer
          ? this._client.players.getByIPlayer(data.source)
          : this._client.entities.getByIEntity(data.source) ?? undefined,
      block: new Block(this._client, data.blockHit),
      projectile: this._client.entities.getByIEntity(data.projectile),
      dimension: this._client.world.getDimension(data.dimension),
      location: data.location,
      vector: data.hitVector,
    })
  }
}
