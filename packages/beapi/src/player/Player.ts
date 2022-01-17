import type {
  Dimension as IDimension,
  EntityHealthComponent,
  EntityInventoryComponent,
  Player as IPlayer,
} from 'mojang-minecraft'
import { BlockLocation } from 'mojang-minecraft'
import type { Entity } from '..'
import type { Client } from '../client'
import type { Location, Dimension, Gamemode, ServerCommandResponse } from '../types'

export class Player {
  [x: string]: any
  protected readonly _client: Client
  protected readonly _IPlayer: IPlayer
  public prevPlayerInVector: Player | undefined
  public prevEntityInVector: Entity | undefined
  public constructor(client: Client, player: IPlayer) {
    this._client = client
    this._IPlayer = player
  }

  public destroy(reason = 'Instantiated player object destroyed!'): void {
    this._client.players.remove(this)
    this._client.executeCommand(`kick "${this.getNameTag()}" ${reason}`)
  }

  public getIPlayer(): IPlayer {
    return this._IPlayer
  }

  public getName(): string {
    return this._IPlayer.name
  }

  public getNameTag(): string {
    return this._IPlayer.nameTag
  }

  public getTags(): string[] {
    return this._IPlayer.getTags()
  }

  public hasTag(tag: string): boolean {
    return this._IPlayer.hasTag(tag)
  }

  public addTag(tag: string): boolean {
    return this._IPlayer.addTag(tag)
  }

  public removeTag(tag: string): boolean {
    return this._IPlayer.removeTag(tag)
  }

  public sendMessage(message: string): void {
    this.executeCommand(`tellraw @s {"rawtext":[{"text":"${message}"}]}`)
  }

  public executeCommand(cmd: string, debug = false): ServerCommandResponse {
    try {
      const command = this._IPlayer.runCommand(cmd)

      return {
        statusMessage: command.statusMessage,
        data: command,
        err: false,
      }
    } catch (error) {
      if (debug) console.warn(`[BeAPI] [Player#executeCommand]: ${String(error)}`)

      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }

  public getScore(objective: string): number {
    const command = this._client.executeCommand(
      `scoreboard players test "${this.getName()}" "${objective}" * *`,
      this.getDimensionName(),
    )
    if (command.err) return 0

    return parseInt(String(command.statusMessage?.split(' ')[1]), 10)
  }

  public getGamemode(): Gamemode {
    const gmc = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=c]`, this.getDimensionName())
    const gma = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=a]`, this.getDimensionName())
    const gms = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=s]`, this.getDimensionName())
    if (!gmc.err) return 'creative'
    if (!gma.err) return 'adventure'
    if (!gms.err) return 'survival'

    return 'unknown'
  }

  public getLocation(): Location {
    const pos = this._IPlayer.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
    }
  }

  public getDimension(): IDimension {
    return this._IPlayer.dimension
  }

  public getDimensionName(): Dimension {
    const block1 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, 127, this.getLocation().z)).id
    const block2 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, 0, this.getLocation().z)).id
    const block3 = this.getDimension().getBlock(new BlockLocation(this.getLocation().x, -64, this.getLocation().z)).id
    if (block3 === 'minecraft:bedrock') return 'overworld'
    else if (block1 === 'minecraft:bedrock' && block2 === 'minecraft:bedrock' && block3 === 'minecraft:air')
      return 'nether'
    return 'the end'
  }

  public getInventory(): EntityInventoryComponent {
    return this._IPlayer.getComponent('minecraft:inventory') as EntityInventoryComponent
  }

  public getHealth(): EntityHealthComponent {
    return this._IPlayer.getComponent('minecraft:health') as EntityHealthComponent
  }

  public getSelectedSlot(): number {
    // TEMP: Until docs are updated.
    return (this._IPlayer as any).selectedSlot as number
  }

  public kick(reason = 'You were kicked from the game!'): void {
    this.destroy(reason)
  }
}
