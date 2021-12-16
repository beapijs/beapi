import {
  BlockLocation,
  Dimension,
  EntityHealthComponent,
  EntityInventoryComponent,
  Player as MCPlayer,
} from 'mojang-minecraft'
import {
  ExecuteCommandResponse,
  Health,
  Inventory,
  Location,
  Dimensions,
} from '../../types/BeAPI.i'
import { executeCommand } from '../command/executeCommand.js'
import { players } from './PlayerManager.js'
import { events } from '../events/EventManager.js'

export class Player {
  private _name: string
  private _nameTag: string
  private _vanilla: MCPlayer

  constructor(player: MCPlayer) {
    this._name = player.nameTag
    this._nameTag = player.nameTag
    this._vanilla = player
    players.addPlayer(this)
  }
  public getName(): string { return this._name }
  public getNameTag(): string { return this._nameTag }
  public getVanilla(): MCPlayer { return this._vanilla }
  public getExecutableName(): string {
    if (!this._name || this._name != this._nameTag) return this._nameTag

    return this._name
  }
  public setNameTag(name: string): void {
    events.emit('NameTagChanged', {
      player: this,
      old: this._nameTag,
      new: name,
    })
    players.updateNameTag({
      player: this,
      old: this._nameTag,
      new: name,
    })
    this._nameTag = name
    this._vanilla.nameTag = name
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
  public getLocation(): Location {
    const pos = this._vanilla.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
      dimension: this._vanilla.dimension,
    }
  }
  public sendMessage(message: string): void {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tellraw @s {"rawtext":[{"text":"${message}"}]}`)
  }
  public getInventory(): Inventory {
    const inventory = this._vanilla.getComponent("minecraft:inventory") as EntityInventoryComponent

    return inventory.container
  }
  public executeCommand(command: string): ExecuteCommandResponse {
    return this._vanilla.runCommand(command.replace(/\\/g, ""))
  }
  public getScore(objective: string): number {
    const command = executeCommand(`scoreboard players test "${this.getExecutableName()}" "${objective}" * *`)
    if (command.err) return 0

    return parseInt(command.statusMessage.split(" ")[1])
  }
  public getHealth(): Health {
    const health = this._vanilla.getComponent("minecraft:health") as EntityHealthComponent

    return {
      current: health.current,
      max: health.value,
    }
  }
  public inPosition(x: number, y: number, z: number, dx: number, dy: number, dz: number): boolean {
    const command = executeCommand(`execute @a[name="${this.getExecutableName()}",x=${x},y=${y},z=${z},dx=${dx},dy=${dy},dz=${dz}] ~ ~ ~ testfor @s`)
    if (command.err) return false

    return true
  }
  public getDimension(): Dimension { return this._vanilla.dimension }
  public getDimensionName(): Dimensions {
    const block1 = this._vanilla.dimension.getBlock(new BlockLocation(this.getLocation().x, 127, this.getLocation().z)).id
    const block2 = this._vanilla.dimension.getBlock(new BlockLocation(this.getLocation().x, 0, this.getLocation().z)).id
    const block3 = this._vanilla.dimension.getBlock(new BlockLocation(this.getLocation().x, -64, this.getLocation().z)).id
    if (block1 === "minecraft:air" && block2 === "minecraft:air" && block3 === "minecraft:bedrock") {
      return "overworld"
    } else if (block1 === "minecraft:bedrock" && block2 === "minecraft:bedrock" && block3 === "minecraft:air") {
      return "nether"
    } else {
      return "the end"
    }
  }
}
