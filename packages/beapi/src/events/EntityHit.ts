import type { Client } from '../client'
import { world, Player as IPlayer, EntityHitEvent } from 'mojang-minecraft'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class EntityHit extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('EntityHit')
  public readonly name = 'EntityHit'

  @setProto('entityHit')
  public readonly iName = 'entityHit'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      world.events[this.iName].subscribe(this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      world.events[this.iName].unsubscribe(this._logic)
    }
  }

  protected __logic(data: EntityHitEvent): void {
    if (!data.hitEntity) return
    if (data.hitEntity.id === 'minecraft:player') return
    const attacker =
      data.entity instanceof IPlayer
        ? this._client.players.getByIPlayer(data.entity)
        : this._client.entities.getByIEntity(data.entity)
    const target = this._client.entities.getByIEntity(data.hitEntity)! // Cannot Not Exist

    return this._client.emit(this.name, {
      attacker,
      target,
      weapon: attacker?.getInventory()?.container.getItem(attacker.getSelectedSlot()) ?? undefined,
    })
  }
}
