import {
  Dimension as IDimension,
  Entity as IEntity,
  EntityHealthComponent,
  EntityInventoryComponent,
  Location as ILocation,
  world,
  BlockLocation,
  Vector,
} from 'mojang-minecraft'
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

  public setNameTag(nametag: string): void {
    this._IEntity.nameTag = nametag
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

  public getScore(objective: string): number {
    const command = this.executeCommand(`scoreboard players test @s "${objective}" * *`)
    if (command.err) return 0

    return parseInt(String(command.statusMessage?.split(' ')[1]), 10)
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
    const overworld = world
      .getDimension('overworld')
      .getEntitiesAtBlockLocation(
        new BlockLocation(this.getLocation().x, this.getLocation().y + 1, this.getLocation().z),
      )
      .find((x) => x === this._IEntity)
    const nether = world
      .getDimension('nether')
      .getEntitiesAtBlockLocation(
        new BlockLocation(this.getLocation().x, this.getLocation().y + 1, this.getLocation().z),
      )
      .find((x) => x === this._IEntity)
    const theEnd = world
      .getDimension('the end')
      .getEntitiesAtBlockLocation(
        new BlockLocation(this.getLocation().x, this.getLocation().y + 1, this.getLocation().z),
      )
      .find((x) => x === this._IEntity)
    if (overworld) return 'overworld'
    if (nether) return 'nether'
    if (theEnd) return 'the end'

    return 'overworld'
  }

  public getInventory(): EntityInventoryComponent | undefined {
    if (!this._IEntity.hasComponent('minecraft:inventory')) return

    return this._IEntity.getComponent('minecraft:inventory') as EntityInventoryComponent
  }

  public getHealth(): EntityHealthComponent {
    return this._IEntity.getComponent('minecraft:health') as EntityHealthComponent
  }

  public getVelocity(): Vector {
    return this._IEntity.velocity
  }

  public setVelocity(velocity: Vector): void {
    this._IEntity.setVelocity(velocity)
  }

  public teleport(location: ILocation, dimension: IDimension, xrot: number, yrot: number): void {
    this._IEntity.teleport(location, dimension, xrot, yrot)
  }

  public teleportFacing(location: ILocation, dimension: IDimension, facingLocation: ILocation): void {
    this._IEntity.teleportFacing(location, dimension, facingLocation)
  }

  public triggerEvent(event: string): void {
    this._IEntity.triggerEvent(event)
  }
}
