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

  public getAllAsArray(): Entity[] {
    return Array.from(this.getAll().values())
  }

  public getByNameTag(nameTag: string): Entity[] | undefined {
    return Array.from(this._entities.values()).filter((e) => e.getNameTag() === nameTag)
  }

  public getByRuntimeId(runtimeId: number): Entity | undefined {
    return this._entities.get(runtimeId)
  }

  public getByUniqueId(uniqueId: number): Entity | undefined {
    return Array.from(this._entities.values()).find((e) => e.getUniqueId() === uniqueId)
  }

  public getByIEntity(IEntity: IEntity): Entity | undefined {
    return Array.from(this._entities.values()).find((e) => e.getIEntity() === IEntity)
  }

  public getLastest(): Entity | undefined {
    return this._entities.get(this._runtimeId - 1)
  }
}
