import type { Client } from '../client'
import { world, Player as IPlayer, Entity as IEntity } from 'mojang-minecraft'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'

interface EntityHurtEvent {
  cause: string
  damage: number
  damagingEntity: IEntity
  hurtEntity: IEntity
  projectile?: IEntity
}

export class PlayerHurt extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('PlayerHurt')
  public readonly name = 'PlayerHurt'

  @setProto('entityHurt')
  public readonly iName = 'entityHurt'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      // @ts-ignore
      world.events[this.iName].subscribe(this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      // @ts-ignore
      world.events[this.iName].unsubscribe(this._logic)
    }
  }

  protected __logic(data: EntityHurtEvent): void {
    if (data.hurtEntity.id !== 'minecraft:player') return
    const attacker =
      data.damagingEntity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.damagingEntity)
        : this._client.entities.getByIEntity(data.damagingEntity)
    const target = this._client.players.getByIPlayer(data.hurtEntity as IPlayer)! // Cannot Not Exist
    const projectile =
      data.projectile instanceof IEntity ? this._client.entities.getByIEntity(data.projectile) : undefined

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
