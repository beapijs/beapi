import type {
  Effect,
  EffectType,
  Entity as IEntity,
  EntityHealthComponent,
  EntityInventoryComponent,
  Vector,
} from 'mojang-minecraft'
import type { Client } from '../client'
import type {
  Location,
  DimensionType,
  ServerCommandResponse,
  EntityComponents,
  Objective,
  PropertyValue,
} from '../types'
import type { Dimension } from '../world'
import { Location as ILocation } from 'mojang-minecraft'
import { getUniqueId } from '../utils'
import { EntityInventory } from '../inventory'
import { Item } from '../item'

/**
 * BeAPI wrapper for the Mojang Minecraft entity object.
 * Main object for interacting with a entity.
 */
export class Entity {
  /**
   * Protected client circular reference.
   */
  protected readonly _client: Client
  /**
   * Protected IEntity object being wrapped.
   */
  protected readonly _IEntity: IEntity
  /**
   * BeAPI runtime id. These are runtime specific,
   * an entities runtime id is not guaranteed to be
   * the same across multiple runtimes.
   */
  protected readonly _runtimeId: number
  /**
   * Minecraft entity UUID.
   */
  protected readonly _uniqueId: number

  /**
   * BeAPI wrapper for the Mojang Minecraft entity object.
   * Main object for interacting with a entity.
   * @param client Client reference.
   * @param entity IEntity to wrap.
   */
  public constructor(client: Client, entity: IEntity) {
    this._client = client
    this._IEntity = entity
    this._runtimeId = this._client.entities.newRuntimeId()
    this._uniqueId = getUniqueId(this)
  }

  /**
   * Destroys the entity object and kills the entity.
   */
  public destroy(): void {
    try {
      this._IEntity.kill()
    } catch {}
  }

  /**
   * Gets the entities Minecraft Mojang IEntity object.
   * @returns
   */
  public getIEntity(): IEntity {
    return this._IEntity
  }

  /**
   * Gets BeAPI runtime ID *(non persistant)*.
   * @returns
   */
  public getRuntimeId(): number {
    return this._runtimeId
  }

  /**
   * Gets the entities ID *(non persistant)*
   * @returns
   */
  public getId(): string {
    return this._IEntity.id
  }

  /**
   * Gets the entities UUID *(persistant)*.
   * @returns
   */
  public getUniqueId(): number {
    return this._uniqueId
  }

  /**
   * Gets the entities name tag.
   * @returns
   */
  public getNameTag(): string {
    return this._IEntity.nameTag
  }

  /**
   * Sets the entities name tag.
   * @param nametag New name tag for entity.
   */
  public setNameTag(nametag: string): void {
    this._IEntity.nameTag = nametag
  }

  /**
   * Gets the entities sneak status.
   * @returns
   */
  public isSneaking(): boolean {
    return this._IEntity.isSneaking
  }

  /**
   * Gets all tags on the entity.
   * @returns
   */
  public getTags(): string[] {
    return this._IEntity.getTags()
  }

  /**
   * Checks if entity has a tag.
   * @param tag Tag to check.
   * @returns
   */
  public hasTag(tag: string): boolean {
    return this._IEntity.hasTag(tag)
  }

  /**
   * Adds a tag to the entity.
   * @param tag Tag to add.
   * @returns `true` mean success.
   */
  public addTag(tag: string): boolean {
    return this._IEntity.addTag(tag)
  }

  /**
   * Removes a tag from the entity.
   * @param tag Tag to remove.
   * @returns `true` mean success.
   */
  public removeTag(tag: string): boolean {
    return this._IEntity.removeTag(tag)
  }

  /**
   * Executes a command as the entity.
   * @param cmd Command to run.
   * @param debug Send debug error to content log.
   * @returns
   */
  public executeCommand<T>(cmd: string, debug = false): ServerCommandResponse<T> {
    try {
      // Try execute the command.
      const command = this._IEntity.runCommand(cmd) as ServerCommandResponse<T>

      // If we can return here it was successful
      return {
        statusMessage: command.statusMessage,
        data: command as unknown as T,
        err: false,
      }
    } catch (error) {
      // If debug pipe error.
      if (debug) console.debug(`[BeAPI] [Entity] [executeCommand]: ${String(error)}`)

      // Return error data.
      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }

  /**
   * Attempts to get the score of then entity on an objective.
   * @param objective Objective to use.
   * @returns
   */
  public getScore(objective: Objective): number {
    const command = this.executeCommand(`scoreboard players test @s "${objective.id}" * *`)
    if (command.err) return 0

    return parseInt(String(command.statusMessage?.split(' ')[1]), 10)
  }

  /**
   * Attempts to set the score of the entity on an objective.
   * @param objective Objective to use.
   * @param amount New score.
   * @returns
   */
  public setScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players set @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Attempts to add score to the entity on an objective.
   * @param objective Objective to use.
   * @param amount Amount to add.
   * @returns
   */
  public addScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players add @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Attempts to remove score from the entity on an objective.
   * @param objective Objective to use.
   * @param amount Amount to remove.
   * @returns
   */
  public removeScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players remove @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Gets the entities current location.
   * @returns
   */
  public getLocation(): Location {
    const pos = this._IEntity.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  /**
   * Gets precise location (decimals)
   * @returns
   */
  public getPreciseLocation(): Location {
    const pos = this._IEntity.location

    return {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    }
  }

  /**
   * Gets the entities current dimension.
   * @returns
   */
  public getDimension(): Dimension {
    return this._client.world.getDimension(this._IEntity.dimension)
  }

  /**
   * Gets the entities inventory.
   * @returns can return `undefined`
   */
  public getInventory(): EntityInventory | undefined {
    if (!this._IEntity.hasComponent('minecraft:inventory')) return

    return new EntityInventory(
      this._client,
      this._IEntity.getComponent('minecraft:inventory') as EntityInventoryComponent,
    )
  }

  /**
   * Gets entites selected slot.
   * @returns
   */
  public getSelectedSlot(): number {
    return 0
  }

  /**
   * Gets the entities health.
   * @returns
   */
  public getHealth(): EntityHealthComponent {
    return this._IEntity.getComponent('minecraft:health') as EntityHealthComponent
  }

  /**
   * Get the entities velocity.
   * @returns
   */
  public getVelocity(): Vector {
    return this._IEntity.velocity
  }

  /**
   * Set the entities velocity.
   * @param velocity New velocity.
   */
  public setVelocity(velocity: Vector): void {
    this._IEntity.setVelocity(velocity)
  }

  /**
   * Teleports the entity.
   * @param location Location to teleport entity to.
   * @param dimension Dimension to teleport entity to.
   * @param xrot X rotation to face when teleported.
   * @param yrot Y rotation to face when teleported
   */
  public teleport(location: Location, dimension: DimensionType, xrot: number, yrot: number): void {
    const loc = new ILocation(location.x, location.y, location.z)
    this._IEntity.teleport(loc, this._client.world.getDimension(dimension).getIDimension(), xrot, yrot)
  }

  /**
   * Teleports the entity facing at ccertain coordinates.
   * @param location Location to teleport the entity to.
   * @param dimension Dimension to teleport entity to.
   * @param facingLocation Location to make entity face.
   */
  public teleportFacing(location: Location, dimension: DimensionType, facingLocation: Location): void {
    const loc = new ILocation(location.x, location.y, location.z)
    const loc2 = new ILocation(facingLocation.x, facingLocation.y, facingLocation.z)
    this._IEntity.teleportFacing(loc, this._client.world.getDimension(dimension).getIDimension(), loc2)
  }

  /**
   * Trigger an event on the entity.
   * @param event Minecraft player event.
   */
  public triggerEvent(event: string): void {
    this._IEntity.triggerEvent(event)
  }

  /**
   * Get the entities rotation.
   * @returns
   */
  public getRotation(): number {
    return this._IEntity.bodyRotation
  }

  /**
   * Get the entities head location.
   * @returns
   */
  public getHeadLocation(): ILocation {
    return this._IEntity.headLocation
  }

  /**
   * Get a entity NBT component.
   * @param component Minecraft NBT component name.
   * @returns
   */
  public getComponent<K extends keyof EntityComponents>(component: K): EntityComponents[K] {
    return this._IEntity.getComponent(component) as unknown
  }

  /**
   * Checks if the entity has an NBT component.
   * @param component Minecraft NBT component name.
   * @returns
   */
  public hasComponent<K extends keyof EntityComponents>(component: K): boolean {
    return this._IEntity.hasComponent(component)
  }

  /**
   * Adds a potion effect to the entity.
   * @param effect Minecraft EffectType.
   * @param duration Length effect should last.
   * @param amplifier Amplifier of effect.
   * @returns
   */
  public addEffect(effect: EffectType, duration: number, amplifier: number): void {
    return this._IEntity.addEffect(effect, duration, amplifier)
  }

  /**
   * Gets a potion effect on the entity.
   * @param effect Minecraft EffectType.
   * @returns
   */
  public getEffect(effect: EffectType): Effect {
    return this._IEntity.getEffect(effect)
  }

  /**
   * Gets a property on the Entity.
   * @param {id} id ID of property.
   * @returns {PropertyValue} Value of the property.
   */
  public getProperty(id: string): PropertyValue {
    return (this._IEntity as any).getDynamicProperty(id)
  }

  /**
   * Sets the value of a property.
   * @param {id} id ID of property.
   * @param {PropertyValue} value Value for the property.
   * @returns {boolean}
   */
  public setProperty(id: string, value: PropertyValue): boolean {
    return (this._IEntity as any).setDynamicProperty(id, value)
  }

  /**
   * Removes a property.
   * @param {string} id ID of property.
   * @returns {boolean}
   */
  public removeProperty(id: string): boolean {
    return (this._IEntity as any).removeDynamicProperty(id)
  }

  /**
   * Gets the Item instance if the entity is a item.
   * @returns {Item | undefined} Item instance.
   */
  public getItemStack(): Item | undefined {
    if (!this.hasComponent('minecraft:item')) return
    const component = this.getComponent('minecraft:item')
    const item = new Item(this._client, component.itemStack)

    return item
  }
}
