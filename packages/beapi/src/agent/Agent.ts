// Regular Imports.
import { Entity } from '../entity/index'
import { getUniqueId } from '..'

// Type Imports.
import type { Entity as IEntity, MinecraftItemTypes } from 'mojang-minecraft'
import type { Client } from '../client'
import type { Player } from '../player/Player'
import type { AgentDirection, AgentRotation } from './Directions'

type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}`
  : S

/**
 * BeAPI wrapper for the Mojang Minecraft agent entity object.
 * Main object for interacting with an agent.
 */
export class Agent extends Entity {
  /**
   * Protected client circular reference.
   */
  protected readonly __client: Client
  /**
   * Protected IEntity object being wrapped.
   */
  protected readonly __IEntity: IEntity
  /**
   * BeAPI runtime id. These are runtime specific,
   * an entities runtime id is not guaranteed to be
   * the same across multiple runtimes.
   */
  protected readonly __runtimeId: number
  /**
   * Minecraft entity UUID.
   */
  protected readonly __uniqueId: number
  /**
   * The Owner of the agent.
   */
  protected readonly _owner: Player
  /**
   * BeAPI wrapper for the Mojang Minecraft agent entity object.
   * Main object for interacting with an agent.
   * @param {Client} client BeAPI Client Instance.
   * @param {Entity} entity BeAPI Entity Instance.
   * @param {Player} owner  BeAPI Player Instance
   */
  public constructor(client: Client, entity: IEntity, owner: Player) {
    super(client, entity)
    this.__client = client
    this.__IEntity = entity
    this.__runtimeId = this._client.entities.newRuntimeId()
    this.__uniqueId = getUniqueId(this)
    this._owner = owner
  }

  /**
   * Destroys the agent.
   */
  public override destroy(): void {
    super.destroy()

    this._owner.hasAgent()
  }

  /**
   * Get the owner.
   * @returns
   */
  public getOwner(): Player {
    return this._owner
  }

  /**
   * Move the agent.
   * @param {AgentDirection} dir Direction.
   * @returns
   */
  public move(dir: AgentDirection): this {
    this._owner.executeCommand(`agent move ${dir}`)

    return this
  }

  /**
   * Rotate the agent.
   * @param {AgentRotation} dir Rotation.
   * @returns
   */
  public turn(dir: AgentRotation): this {
    this._owner.executeCommand(`agent turn ${dir}`)

    return this
  }

  /**
   * Force the agent to attack.
   * @param {AgentDirection} dir Direction.
   * @returns
   */
  public attack(dir: AgentDirection): this {
    this._owner.executeCommand(`agent attack ${dir}`)

    return this
  }

  /**
   * Force the agent to break a block.
   * @param {AgentDirection} dir Direction.
   * @returns
   */
  public breakBlock(dir: AgentDirection): this {
    this._owner.executeCommand(`agent destroy ${dir}`)

    return this
  }

  /**
   * Force the agent to place a block.
   * @param {AgentDirection} dir Direction.
   * @param {number} slot Slot number.
   * @returns
   */
  public placeBlock(dir: AgentDirection, slot = 1): this {
    this._owner.executeCommand(`agent place ${slot} ${dir}`)

    return this
  }

  /**
   * Force the agent to till dirt.
   * @param {AgentDirection} dir Direction.
   * @returns
   */
  public till(dir: AgentDirection): this {
    this._owner.executeCommand(`agent till ${dir}`)

    return this
  }

  /**
   * Force agent to grab item.
   * @param {CamelToSnakeCase<keyof typeof MinecraftItemTypes>} item Item Id.
   * @returns
   */
  public grabItem(item: CamelToSnakeCase<keyof typeof MinecraftItemTypes>): this {
    this._owner.executeCommand(`agent collect ${item}`)

    return this
  }

  /**
   * Force agent to drop item.
   * @param {AgentDirection} dir Direction.
   * @param {number} amount Amount to drop.
   * @param {number} slot Slot number.
   * @returns
   */
  public dropItem(dir: AgentDirection, amount = 1, slot = 1): this {
    this._owner.executeCommand(`agent drop ${slot} ${amount} ${dir}`)

    return this
  }
}
