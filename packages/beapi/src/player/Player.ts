import {
  Dimension as IDimension,
  EntityHealthComponent,
  EntityInventoryComponent,
  Player as IPlayer,
  Location as ILocation,
  Vector,
  EffectType,
  Effect,
} from 'mojang-minecraft'
import { ModalForm, MessageForm, ActionForm } from '../forms'
import type { Entity } from '..'
import type { Client } from '../client'
import type { Location, Dimension, Gamemode, ServerCommandResponse, PlayerComponents } from '../types'

export class Player {
  protected readonly _client: Client
  protected readonly _IPlayer: IPlayer
  protected readonly _name: string
  public prevPlayerInVector: Player | undefined
  public prevEntityInVector: Entity | undefined
  public constructor(client: Client, player: IPlayer) {
    this._client = client
    this._IPlayer = player
    this._name = player.name
  }

  public destroy(reason = 'Instantiated player object destroyed!'): void {
    this._client.executeCommand(`kick "${this.getNameTag()}" ${reason}`)
  }

  public getIPlayer(): IPlayer {
    return this._IPlayer
  }

  public getName(): string {
    return this._name
  }

  public getNameTag(): string {
    return this._IPlayer.nameTag
  }

  public setNameTag(nametag: string): void {
    this._IPlayer.nameTag = nametag
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

  public createModalForm(): ModalForm {
    return new ModalForm(this)
  }

  public createMessageForm(): MessageForm {
    return new MessageForm(this)
  }

  public createActionForm(): ActionForm {
    return new ActionForm(this)
  }

  public sendMessage(message: string): void {
    this.executeCommand(`tellraw @s {"rawtext":[{"text":"${message}"}]}`)
  }

  public sendActionbar(message: string): void {
    this.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"${message}"}]}`)
  }

  public sendTitle(message: string): void {
    this.executeCommand(`titleraw @s title {"rawtext":[{"text":"${message}"}]}`)
  }

  public sendSubtitle(message: string): void {
    this.executeCommand(`titleraw @s subtitle {"rawtext":[{"text":"${message}"}]}`)
  }

  public sendSound(sound: string, location?: Location, volume?: number, pitch?: number, maxVolume?: number): void {
    this.executeCommand(
      `playsound ${sound} ${location?.x ?? ''} ${location?.y ?? ''} ${location?.z ?? ''} ${volume ?? ''} ${
        pitch ?? ''
      } ${maxVolume ?? ''}`,
    )
  }

  public sendAnimation(animation: string): void {
    this.executeCommand(`playanimation @s ${animation}`)
  }

  public sendFog(type: 'pop' | 'push' | 'remove', fogId: string, globalId: string): void {
    this.executeCommand(`fog @s ${type} ${fogId} ${globalId}`)
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
    const command = this.executeCommand(`scoreboard players test @s "${objective}" * *`)
    if (command.err) return 0

    return parseInt(String(command.statusMessage?.split(' ')[1]), 10)
  }

  public setScore(objective: string, amount: number): void {
    this.executeCommand(`scoreboard players set @s "${objective}" ${amount}`)
  }

  public addScore(objective: string, amount: number): void {
    this.executeCommand(`scoreboard players add @s "${objective}" ${amount}`)
  }

  public removeScore(objective: string, amount: number): void {
    this.executeCommand(`scoreboard players remove @s "${objective}" ${amount}`)
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
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  public getDimension(): IDimension {
    return this._IPlayer.dimension
  }

  public getDimensionName(): Dimension {
    // TEMP: Until types get updated
    const id = ((this.getDimension() as any).id as string).split(':')[1].replace(/_/g, ' ')

    return id as Dimension
  }

  public getInventory(): EntityInventoryComponent {
    return this._IPlayer.getComponent('minecraft:inventory') as EntityInventoryComponent
  }

  public getHealth(): EntityHealthComponent {
    return this._IPlayer.getComponent('minecraft:health') as EntityHealthComponent
  }

  public getSelectedSlot(): number {
    return this._IPlayer.selectedSlot
  }

  public kick(reason = 'You were kicked from the game!'): void {
    this.destroy(reason)
  }

  public getVelocity(): Vector {
    return this._IPlayer.velocity
  }

  public setVelocity(velocity: Vector): void {
    this._IPlayer.setVelocity(velocity)
  }

  public teleport(location: Location, dimension: IDimension, xrot: number, yrot: number): void {
    const loc = new ILocation(location.x, location.y, location.z)
    this._IPlayer.teleport(loc, dimension, xrot, yrot)
  }

  public teleportFacing(location: Location, dimension: IDimension, facingLocation: Location): void {
    const loc = new ILocation(location.x, location.y, location.z)
    const loc2 = new ILocation(facingLocation.x, facingLocation.y, facingLocation.z)
    this._IPlayer.teleportFacing(loc, dimension, loc2)
  }

  public triggerEvent(event: string): void {
    this._IPlayer.triggerEvent(event)
  }

  public getRotation(): number {
    return this._IPlayer.bodyRotation
  }

  public getHeadLocation(): ILocation {
    return this._IPlayer.headLocation
  }

  public getComponent<K extends keyof PlayerComponents>(component: K): PlayerComponents[K] {
    return this._IPlayer.getComponent(component) as any
  }

  public hasComponent<K extends keyof PlayerComponents>(component: K): boolean {
    return this._IPlayer.hasComponent(component)
  }

  public addEffect(effect: EffectType, duration: number, amplifier: number): void {
    return this._IPlayer.addEffect(effect, duration, amplifier)
  }

  public getEffect(effect: EffectType): Effect {
    return this._IPlayer.getEffect(effect)
  }

  public setItemCooldown(itemCategory: string, ticks: number): void {
    this._IPlayer.startItemCooldown(itemCategory, ticks)
  }
}
