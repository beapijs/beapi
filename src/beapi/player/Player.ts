import { Player as MCPlayer } from 'mojang-minecraft'
import {
  ExecuteCommandResponse,
  Inventory,
  Location,
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
    this._nameTag = name
    this._vanilla.nameTag = name
  }
  public getTags(): string[] {
    const raw = executeCommand(`tag "${this.getExecutableName()}" list`).statusMessage.split(' ')
    const tags = []
    for (const string of raw) {
      if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '')
        .replace(',', ''))
    }

    return tags
  }
  public hasTag(tag: string): boolean {
    const tags = this.getTags()
    if (!tags.includes(tag)) return false

    return true
  }
  public addTag(tag: string): void {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tag @s add "${tag}"`)
  }
  public removeTag(tag: string): void {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tag @s remove "${tag}"`)
  }
  public getLocation(): Location {
    const pos = this._vanilla.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
    }
  }
  public sendMessage(message: string): void {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tellraw @s {"rawtext":[{"text":"${message}"}]}`)
  }
  public getInventory(): Inventory {
    return this._vanilla.getComponent("minecraft:inventory").container
  }
  public executeCommand(command: string): ExecuteCommandResponse {
    return executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ ${command}`)
  }
}
