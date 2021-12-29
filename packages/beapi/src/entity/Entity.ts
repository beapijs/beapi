import { Entity as MCEntity, EntityHealthComponent, BlockLocation, Dimension } from 'mojang-minecraft'
import { entities } from './EntityManager.js'
import { events } from '../events/EventManager.js'
import type { Health, Location, Dimensions, ExecuteCommandResponse } from '../@types/BeAPI.i.js'

export class Entity {
  private _nameTag: string
  private readonly _id: string
  private _vanilla: MCEntity
  private readonly _runtimeId: number

  public constructor(entity: MCEntity) {
    this._nameTag = entity.nameTag
    this._id = entity.id
    this._vanilla = entity
    this._runtimeId = entities.getNewRuntimeId()
    entities.addEntity(this)
    this._setUpEntity()
  }

  private _setUpEntity(): void {
    this._vanilla.nameTag = `${this._id}:${this._runtimeId}`
    this._vanilla.runCommand(`scoreboard players set @s "ent:runtimeId" ${this._runtimeId}`)
    this._vanilla.nameTag = this._nameTag
  }

  public setNameTag(nameTag: string): void {
    this._nameTag = nameTag
    this._vanilla.nameTag = nameTag
  }

  public getNameTag(): string {
    return this._nameTag
  }

  public getId(): string {
    return this._id
  }

  public getVanilla(): MCEntity {
    return this._vanilla
  }

  public getRuntimeId(): number {
    return this._runtimeId
  }

  public destroy(): void {
    events.emit('EntityDestroyed', this)
    this._vanilla.kill()
    entities.removeEntity(this)
  }

  public executeCommand(command: string, debug = false): ExecuteCommandResponse {
    try {
      const cmd = this._vanilla.runCommand(command.replace(/\\/g, ''))

      return {
        statusMessage: cmd.statusMessage,
        data: cmd,
        err: false,
      }
    } catch (err) {
      if (!debug)
        return {
          statusMessage: `Error Occured: ${err}`,
          err: true,
        }
      console.warn(`[BeAPI] [executeCommand]${err}`)

      return {
        statusMessage: 'Error Occured',
        err: true,
      }
    }
  }

  public getLocation(): Location {
    const pos = this._vanilla.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
      dimension: this._vanilla.dimension,
    }
  }

  public getHealth(): Health {
    const health = this._vanilla.getComponent('minecraft:health') as EntityHealthComponent

    return {
      current: health.current,
      max: health.value,
    }
  }

  public getTags(): string[] {
    return this._vanilla.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._vanilla.hasTag(tag)
  }

  public addTag(tag: string): boolean {
    return this._vanilla.addTag(tag)
  }

  public removeTag(tag: string): boolean {
    return this._vanilla.removeTag(tag)
  }

  public getDimension(): Dimension {
    return this._vanilla.dimension
  }

  public getDimensionName(): Dimensions {
    const block1 = this._vanilla.dimension.getBlock(
      new BlockLocation(this.getLocation().x, 127, this.getLocation().z),
    ).id
    const block2 = this._vanilla.dimension.getBlock(new BlockLocation(this.getLocation().x, 0, this.getLocation().z)).id
    const block3 = this._vanilla.dimension.getBlock(
      new BlockLocation(this.getLocation().x, -64, this.getLocation().z),
    ).id
    if (block1 === 'minecraft:air' && block2 === 'minecraft:air' && block3 === 'minecraft:bedrock') {
      return 'overworld'
    } else if (block1 === 'minecraft:bedrock' && block2 === 'minecraft:bedrock' && block3 === 'minecraft:air') {
      return 'nether'
    }
    return 'the end'
  }
}
