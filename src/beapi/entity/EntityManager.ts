import {
  Entity as MCEntity,
  World,
} from 'mojang-minecraft'
import { executeCommand } from '../BeAPI.js'
import { Entity } from './Entity.js'

export class EntityManager {
  private _runtimeId = 0
  private _entities = {
    nameTag: new Map<string, Entity>(),
    runtimeId: new Map<number, Entity>(),
    vanilla: new Map<MCEntity, Entity>(),
  }

  constructor() {
    executeCommand('scoreboard objectives remove "ent:runtimeId"')
    executeCommand('scoreboard objectives add "ent:runtimeId" dummy')
    World.events.tick.subscribe(() => {
      this._entityCheck()
    })
  }
  private _entityCheck(): void {
    for (const [, entity] of this._entities.runtimeId) {
      try {
        const command = entity.executeCommand('testfor @s')
        if (command.err != true) continue 
        entity.destroy()
      } catch (err) {
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
  public getEntityByNameTag(nameTag: string, entityType: string): Entity {
    return this._entities.nameTag.get(`${nameTag}:${entityType}`)
  }
  public getEntityByRuntimeId(runtimeId: number): Entity { return this._entities.runtimeId.get(runtimeId) }
  public getEntityByVanilla(vanilla: MCEntity): Entity { return this._entities.vanilla.get(vanilla) }
  public getLatestEntity(): Entity { return this._entities.runtimeId.get(this._runtimeId) }
  public getEntityList(): Map<number, Entity> { return this._entities.runtimeId }
}

const entities = new EntityManager()

export {
  entities,
}
