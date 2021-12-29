import { Entity as MCEntity, world } from 'mojang-minecraft'
import { executeCommand } from '../index.js'
import type { Entity } from './Entity.js'
import { events } from '../events/EventManager.js'

export class EntityManager {
  private _runtimeId = 0
  private readonly _entities = {
    nameTag: new Map<string, Entity>(),
    runtimeId: new Map<number, Entity>(),
    vanilla: new Map<MCEntity, Entity>(),
  }

  public constructor() {
    executeCommand('scoreboard objectives remove "ent:runtimeId"')
    executeCommand('scoreboard objectives add "ent:runtimeId" dummy')
    world.events.tick.subscribe(() => {
      this._entityCheck()
    })
  }

  private _entityCheck(): void {
    for (const [, entity] of this._entities.runtimeId) {
      try {
        entity.getVanilla().id
      } catch (err) {
        events.emit('EntityDestroyed', entity)
        this.removeEntity(entity)
      }
    }
  }

  public addEntity(entity: Entity): void {
    this._entities.nameTag.set(`${entity.getNameTag()}:${entity.getId()}`, entity)
    this._entities.runtimeId.set(entity.getRuntimeId(), entity)
    this._entities.vanilla.set(entity.getVanilla(), entity)
  }

  public removeEntity(entity: Entity): void {
    this._entities.nameTag.delete(`${entity.getNameTag()}:${entity.getId()}`)
    this._entities.runtimeId.delete(entity.getRuntimeId())
    this._entities.vanilla.delete(entity.getVanilla())
  }

  public getNewRuntimeId(): number {
    this._runtimeId++

    return this._runtimeId
  }

  public getEntityByNameTag(nameTag: string, entityType: string): Entity | undefined {
    return this._entities.nameTag.get(`${nameTag}:${entityType}`)
  }

  public getEntityByRuntimeId(runtimeId: number): Entity | undefined {
    return this._entities.runtimeId.get(runtimeId)
  }

  public getEntityByVanilla(vanilla: MCEntity): Entity | undefined {
    return this._entities.vanilla.get(vanilla)
  }

  public getLatestEntity(): Entity | undefined {
    return this._entities.runtimeId.get(this._runtimeId)
  }

  public getEntityList(): Map<number, Entity> {
    return this._entities.runtimeId
  }
}

const entities = new EntityManager()

export { entities }
