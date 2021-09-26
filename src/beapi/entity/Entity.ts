import { Entity as MCEntity } from 'mojang-minecraft'
import { executeCommand } from '../BeAPI.js'
import { entities } from './EntityManager.js'

export class Entity {
  private _nameTag: string
  private _id: string
  private _vanilla: MCEntity
  private _runtimeId: number

  constructor(entity: MCEntity) {
    this._nameTag = entity.nameTag
    this._id = entity.id
    this._vanilla = entity
    this._runtimeId = entities.getNewRuntimeId()
    entities.addEntity(this)
    this._setUpEntity()
  }
  private _setUpEntity(): void {
    this._vanilla.nameTag = `${this._id}:${this._runtimeId}`
    executeCommand(`execute @e[name="${this._vanilla.nameTag}"] ~ ~ ~ scoreboard players set @s "ent:runtimeId" ${this._runtimeId}`)
    this._vanilla.nameTag = ""
  }
  public getNameTag(): string { return this._nameTag }
  public getId(): string { return this._id }
  public getVanilla(): MCEntity { return this._vanilla }
  public getRuntimeId(): number { return this._runtimeId }
  public destroy(): void {
    this._vanilla.kill()
    entities.removeEntity(this)
  }
  public executeCommand(command: string): void {
    executeCommand(`execute @e[scores={"ent:runtimeId"=${this._runtimeId}}] ~ ~ ~ ${command}`)
  }
}
