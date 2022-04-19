// Regular imports.
import { Entity } from '.'

// Type imports.
import type { Entity as IEntity } from 'mojang-minecraft'
import type { Client } from '../client'

/**
 * Entity manager is the main hub for interacting with
 * entities inside the world currently.
 */
export class EntityManager {
  /**
   * Protected client circular reference.
   */
  protected readonly _client: Client
  /**
   * Protected entity map.
   */
  protected readonly _entities = new Map<number, Entity>()
  /**
   * Current BeAPI runtime id.
   */
  protected _runtimeId = 0

  /**
   * Entity manager is the main hub for interacting with
   * entities inside the world currently.
   * @param client Client reference.
   */
  public constructor(client: Client) {
    this._client = client
  }

  /**
   * Creates a new runtime id that can be used.
   * *Two ids will not overlap in the same runtime
   * but can overlap in two different runtimes.*
   * @returns
   */
  public newRuntimeId(): number {
    return this._runtimeId++
  }

  /**
   * Adds a entity to the entity manager.
   * @param entity Entity to add.
   */
  public add(entity: Entity): void {
    this._entities.set(entity.getRuntimeId(), entity)
  }

  /**
   * Creates a new entity from a Minecraft IEntity.
   * @param entity IEntity object.
   * @returns
   */
  public create(entity: IEntity): Entity {
    return new Entity(this._client, entity)
  }

  /**
   * Removes an entity from the entity manager.
   *
   * WARNING: Please do not remove entities this way.
   * If you want to remove an entity, get them and call
   * `Entity.destroy()`! Removing them this way
   * when they are still in the world will
   * most likely cause issues.
   * @param entity IEntity to remove.
   */
  public remove(entity: Entity): void {
    this._entities.delete(entity.getRuntimeId())
  }

  /**
   * Removes an entity from the entity manager.
   *
   * WARNING: Please do not remove entities this way.
   * If you want to remove an entity, get them and call
   * `Entity.destroy()`! Removing them this way
   * when they are still in the world will
   * most likely cause issues.
   * @param runtimeId Runtime id of entity.
   */
  public removeByRuntimeId(runtimeId: number): void {
    this._entities.delete(runtimeId)
  }

  /**
   * Gets all entities in the world as a map.
   * @returns
   */
  public getAll(): Map<number, Entity> {
    return this._entities
  }

  /**
   * Gets all entities in the world as an array.
   * @returns
   */
  public getAllAsArray(): Entity[] {
    return Array.from(this.getAll().values())
  }

  /**
   * Attempts to get all entities with given nametag.
   * @param nameTag Name tag of entity.
   * @returns can return `undefined`
   */
  public getByNameTag(nameTag: string): Entity[] | undefined {
    return Array.from(this._entities.values()).filter((e) => e.getNameTag() === nameTag)
  }

  /**
   * Attempts to get all entities with given id.
   * @param id Id of entities.
   * @returns can return `undefined`
   */
  public getByIdentity(id: string): Entity[] | undefined {
    return Array.from(this._entities.values()).filter((e) => e.getId() === id)
  }

  /**
   * Attempts to get an entity by its runtime id.
   * @param runtimeId Runtime id of entity.
   * @returns can return `undefined`
   */
  public getByRuntimeId(runtimeId: number): Entity | undefined {
    return this._entities.get(runtimeId)
  }

  /**
   * Attempts to get an entity by its unique id.
   * @param uniqueId Unique id of entity.
   * @returns can return `undefined`
   */
  public getByUniqueId(uniqueId: number): Entity | undefined {
    return Array.from(this._entities.values()).find((e) => e.getUniqueId() === uniqueId)
  }

  /**
   * Attempts to get an entity by its Minecraft IEntity.
   * @param IEntity IEntity of entity.
   * @returns can return `undefined`
   */
  public getByIEntity(IEntity: IEntity): Entity | undefined {
    return Array.from(this._entities.values()).find((e) => e.getIEntity() === IEntity)
  }

  /**
   * Gets the most recently spawned entity.
   * @returns can return `undefined`
   */
  public getLastest(): Entity | undefined {
    return this._entities.get(this._runtimeId - 1)
  }
}
