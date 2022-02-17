import type { Entity as IEntity } from 'mojang-minecraft'
import { Entity } from '.'
import type { Client } from '../client'

export class EntityManager {
  protected readonly _client: Client
  protected readonly _entities = new Map<number, Entity>()
  protected _runtimeId = 0
  public constructor(client: Client) {
    this._client = client
  }

  public newRuntimeId(): number {
    return this._runtimeId++
  }

  public add(entity: Entity): void {
    this._entities.set(entity.getRuntimeId(), entity)
  }

  public create(entity: IEntity): Entity {
    return new Entity(this._client, entity)
  }

  public remove(entity: Entity): void {
    this._entities.delete(entity.getRuntimeId())
  }

  public removeByRuntimeId(runtimeId: number): void {
    this._entities.delete(runtimeId)
  }

  public getAll(): Map<number, Entity> {
    return this._entities
  }

  public getByNameTag(nameTag: string): Entity {
    return Array.from(this._entities.values()).find((e) => e.getNameTag() === nameTag) as Entity
  }

  public getByRuntimeId(runtimeId: number): Entity {
    return this._entities.get(runtimeId) as Entity
  }

  public getByUniqueId(uniqueId: number): Entity {
    return Array.from(this._entities.values()).find((e) => e.getUniqueId() === uniqueId) as Entity
  }

  public getByIEntity(IEntity: IEntity): Entity {
    return Array.from(this._entities.values()).find((e) => e.getIEntity() === IEntity) as Entity
  }

  public getLastest(): Entity {
    return this._entities.get(this._runtimeId - 1) as Entity
  }
}
