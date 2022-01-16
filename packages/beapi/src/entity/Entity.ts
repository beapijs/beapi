import type {
  Dimension as IDimension,
  Entity as IEntity,
  EntityHealthComponent,
  EntityInventoryComponent,
} from 'mojang-minecraft'
import { BlockLocation } from 'mojang-minecraft'
import type { Client } from '../client'
import type { Location, Dimension, ServerCommandResponse } from '../types'

export class Entity {
  protected readonly _client: Client
  protected readonly _IEntity: IEntity
  protected readonly _runtimeId: number
  public constructor(client: Client, entity: IEntity) {
    this._client = client
    this._IEntity = entity
    this._runtimeId = this._client.entities.newRuntimeId()
  }

  public destroy(): void {
    this._client.entities.remove(this)
    try {
      this._IEntity.kill()
    } catch {}
  }

  public getIEntity(): IEntity {
    return this._IEntity
  }

  public getRuntimeId(): number {
    return this._runtimeId
  }

  public getId(): string {
    return this._IEntity.id
  }

  public getNameTag(): string {
    return this._IEntity.nameTag
  }

  public getTags(): string[] {
    return this._IEntity.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._IEntity.hasTag(tag)
  }

  public addTag(tag: string): boolean {
    return this._IEntity.addTag(tag)
  }

  public removeTag(tag: string): boolean {
    return this._IEntity.removeTag(tag)
  }

  public executeCommand(cmd: string, debug = false): ServerCommandResponse {
    try {
      const command = this._IEntity.runCommand(cmd)

      return {
        statusMessage: command.statusMessage,
        data: command,
        err: false,
      }
    } catch (error) {
      if (debug) console.warn(`[BeAPI] [Entity#executeCommand]: ${String(error)}`)

      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }

  public getLocation(): Location {
    const pos = this._IEntity.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
    }
  }

  public getDimension(): IDimension {
    return this._IEntity.dimension
  }

  public getDimensionName(): Dimension {
    const block1 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, 127, this.getLocation().z)).id
    const block2 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, 0, this.getLocation().z)).id
    const block3 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, -64, this.getLocation().z)).id
    if (block1 === 'minecraft:air' && block2 === 'minecraft:air' && block3 === 'minecraft:bedrock') return 'overworld'
    else if (block1 === 'minecraft:bedrock' && block2 === 'minecraft:bedrock' && block3 === 'minecraft:air') {
      return 'nether'
    }
    return 'the end'
  }

  public getInventory(): EntityInventoryComponent | undefined {
    if (!this._IEntity.hasComponent('minecraft:inventory')) return

    return this._IEntity.getComponent('minecraft:inventory') as EntityInventoryComponent
  }

  public getHealth(): EntityHealthComponent {
    return this._IEntity.getComponent('minecraft:health') as EntityHealthComponent
  }
}
