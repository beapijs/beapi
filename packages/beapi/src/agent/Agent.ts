import type { Entity as IEntity, MinecraftItemTypes } from 'mojang-minecraft'
import { Entity } from '../entity/index'
import type { Client } from '../client'
import { getUniqueId } from '..'
import type { Player } from '../player/Player'
import type { AgentDirection, AgentRotation } from './Directions'

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

export class Agent extends Entity {
  protected readonly __client: Client
  protected readonly __IEntity: IEntity
  protected readonly __runtimeId: number
  protected readonly __uniqueId: number
  protected readonly _owner: Player
  public constructor(client: Client, entity: IEntity, owner: Player) {
    super(client, entity)
    this.__client = client
    this.__IEntity = entity
    this.__runtimeId = this._client.entities.newRuntimeId()
    this.__uniqueId = getUniqueId(this)
    this._owner = owner
  }

  public getOwner(): Player {
    return this._owner
  }

  public move(dir: AgentDirection): this {
    this._owner.executeCommand(`agent move ${dir}`)

    return this
  }

  public turn(dir: AgentRotation): this {
    this._owner.executeCommand(`agent turn ${dir}`)

    return this
  }

  public attack(dir: AgentDirection): this {
    this._owner.executeCommand(`agent attack ${dir}`)

    return this
  }

  public breakBlock(dir: AgentDirection): this {
    this._owner.executeCommand(`agent destroy ${dir}`)

    return this
  }

  public placeBlock(dir: AgentDirection, slot = 1): this {
    this._owner.executeCommand(`agent place ${slot} ${dir}`)

    return this
  }

  public till(dir: AgentDirection): this {
    this._owner.executeCommand(`agent till ${dir}`)

    return this
  }

  public grabItem(item: CamelToSnakeCase<keyof typeof MinecraftItemTypes>): this {
    this._owner.executeCommand(`agent collect ${item}`)

    return this
  }

  public dropItem(dir: AgentDirection, amount = 1, slot = 1): this {
    this._owner.executeCommand(`agent drop ${slot} ${amount} ${dir}`)

    return this
  }
}
