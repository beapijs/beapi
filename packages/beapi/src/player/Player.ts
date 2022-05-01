// Regular imports.
import {
  EntityHealthComponent,
  EntityInventoryComponent,
  Player as IPlayer,
  Location as ILocation,
  Vector,
  EffectType,
  Effect,
} from 'mojang-minecraft'
import { ModalForm, MessageForm, ActionForm } from '../forms'
import { Agent } from '../agent/Agent'
import { EntityInventory } from '../inventory'

// Type imports.
import type { Client } from '../client'
import type { Dimension } from '../world'
import type {
  Location,
  DimensionNamespace,
  Gamemode,
  ServerCommandResponse,
  PlayerComponents,
  Objective,
  FogType,
  CameraShakeType,
  PropertyValue,
} from '../types'

/**
 * BeAPI wrapper for the Mojang Minecraft player object.
 * Main object for interacting with a player.
 */
export class Player {
  /**
   * Protected client circular reference.
   */
  protected readonly _client: Client
  /**
   * Protected IPlayer object being wrapped.
   */
  protected readonly _IPlayer: IPlayer
  /**
   * Protected name of the player.
   */
  protected readonly _name: string
  /**
   * Protected players personal agent.
   */
  protected _agent: Agent | undefined

  /**
   * Protected BeAPI runtime id for player.
   */
  protected readonly _runtimeId: number

  // Protected player states.
  protected _isSwimming = false
  protected _isInWater = false
  protected _isGrounded = true
  protected _isBurning = false
  protected _isMoving = false
  protected _isSprinting = false
  protected _isRiding = false
  protected _isSleeping = false
  protected _isAlive = true
  protected _isMuted = false

  /**
   * BeAPI wrapper for the Mojang Minecraft player object.
   * Main object for interacting with a player.
   * @param client Client reference.
   * @param player IPlayer to wrap.
   */
  public constructor(client: Client, player: IPlayer) {
    this._client = client
    this._IPlayer = player
    this._name = player.name
    this._runtimeId = client.players.newRuntimeId()
    this._agent = this.attemptFindAgent()
  }

  /**
   * Destroys the player object and kicks them from the game.
   * @param reason Reason for being destroyed *(kicked)*
   */
  public destroy(reason = 'Instantiated player object destroyed!'): void {
    this._client.executeCommand(`kick "${this.getNameTag()}" ${reason}`)
  }

  /**
   * Gets the players Minecraft Mojang IPlayer object.
   * @returns
   */
  public getIPlayer(): IPlayer {
    return this._IPlayer
  }

  /**
   * Gets the players ID *(non persistant)*.
   * @returns
   */
  public getId(): string {
    return this._IPlayer.id
  }

  /**
   * Gets BeAPI runtime ID *(non persistant)*.
   * @returns
   */
  public getRuntimeId(): number {
    return this._runtimeId
  }

  /**
   * Gets the players name.
   * @returns
   */
  public getName(): string {
    return this._name
  }

  /**
   * Gets the players name tag *(display name)*.
   * @returns
   */
  public getNameTag(): string {
    return this._IPlayer.nameTag
  }

  /**
   * Sets the players name tag *(display name)*.
   * @param nametag Display name to set.
   */
  public setNameTag(nametag: string): void {
    this._IPlayer.nameTag = nametag
  }

  /**
   * Gets an array of all the players tags.
   * @returns
   */
  public getTags(): string[] {
    return this._IPlayer.getTags()
  }

  /**
   * Checks if the player has a specfic tag.
   * @param tag Tag name.
   * @returns
   */
  public hasTag(tag: string): boolean {
    return this._IPlayer.hasTag(tag)
  }

  /**
   * Adds a new tag to the player.
   * @param tag Tag to add.
   * @returns
   */
  public addTag(tag: string): boolean {
    return this._IPlayer.addTag(tag)
  }

  /**
   * Removes a tag from the player.
   * @param tag Tag to remove.
   * @returns
   */
  public removeTag(tag: string): boolean {
    return this._IPlayer.removeTag(tag)
  }

  /**
   * Creates a new modal form on the player.
   * @returns
   */
  public createModalForm(): ModalForm {
    return new ModalForm(this, this._client)
  }

  /**
   * Creates a new message form on the player.
   * @returns
   */
  public createMessageForm(): MessageForm {
    return new MessageForm(this, this._client)
  }

  /**
   * Creates a new action form on the player.
   * @returns
   */
  public createActionForm(): ActionForm {
    return new ActionForm(this, this._client)
  }

  /**
   * Attempts to get the players agent and creates it if
   * it does not exist.
   * @returns
   * @deprecated Use `getAgent` instead.
   */
  public createAgent(): Agent {
    return this.getAgent()
  }

  /**
   * Checks if the user currently has an agent.
   * @returns
   */
  public hasAgent(): boolean {
    // Try to get the entities id. If it returns an error
    // (which it will when its dead as you are trying to access
    // released memory through a now invalidated pointer)
    // Then removes the agent
    try {
      if (this._agent?.getId()) return true

      return false
    } catch {
      this._agent = undefined

      return false
    }
  }

  /**
   * Attempts to get the players agent and creates it if
   * it does not exist.
   * @returns
   */
  public getAgent(): Agent {
    // Attempt get the agent.
    let agent = this.attemptFindAgent()

    // If no agent
    if (!agent) {
      // Create an agent for them.
      this.executeCommand('agent create')

      // Get the agent.
      const entity = this._client.entities.getLastest()! // Should Not, Not Exist

      // Construct the entity in an Agent class.
      agent = new Agent(this._client, entity.getIEntity(), this)

      // Add the players name as a tag to the agent.
      agent.addTag(this._name)

      // Assign this._agent to the new agent/
      this._agent = agent
    }

    // Return the agent.
    return agent
  }

  /**
   * Attempts to find the players agent from entity manager.
   * @returns can return `undefined`.
   */
  protected attemptFindAgent(): Agent | undefined {
    // If there is no agent.
    if (!this.hasAgent()) return
    // If this._agent then return it.
    if (this._agent) return this._agent

    // Query all entities for an agent that has the players name as a tag.
    const entity = Array.from(this._client.entities.getAll().values()).find(
      (x) => x.getId() === 'minecraft:agent' && x.hasTag(this._name),
    )

    // If entity return new Agent otherwise return undefined.
    return entity ? new Agent(this._client, entity.getIEntity(), this) : undefined
  }

  /**
   * Sends a message to the player.
   * @param message Message content to send.
   */
  public sendMessage(message: string): void {
    this.executeCommand(`tellraw @s {"rawtext":[{"text":"${message.replace(/"/g, '\\"')}"}]}`)
  }

  /**
   * Sends action bar text to the player.
   * @param message Message content to set.
   */
  public sendActionbar(message: string): void {
    this.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"${message.replace(/"/g, '\\"')}"}]}`)
  }

  /**
   * Sends a title to the player.
   * @param message Message content to set.
   */
  public sendTitle(message: string): void {
    this.executeCommand(`titleraw @s title {"rawtext":[{"text":"${message.replace(/"/g, '\\"')}"}]}`)
  }

  /**
   * Sends a subtitle to the player.
   * @param message Message content to set.
   */
  public sendSubtitle(message: string): void {
    this.executeCommand(`titleraw @s subtitle {"rawtext":[{"text":"${message.replace(/"/g, '\\"')}"}]}`)
  }

  /**
   * Sends a sound to the player.
   * @param sound Minecraft sound id.
   * @param location Optional location to play at.
   * @param volume Optional volume of the sound.
   * @param pitch Optional pitch of the sound.
   * @param maxVolume Optional maxVolume of the sound.
   */
  public sendSound(sound: string, location?: Location, volume?: number, pitch?: number, maxVolume?: number): void {
    this.executeCommand(
      `playsound ${sound} ${location?.x ?? ''} ${location?.y ?? ''} ${location?.z ?? ''} ${volume ?? ''} ${
        pitch ?? ''
      } ${maxVolume ?? ''}`,
    )
  }

  /**
   * Plays an animation for the player.
   * @param animation Minecraft animation id.
   */
  public sendAnimation(animation: string): void {
    this.executeCommand(`playanimation @s ${animation}`)
  }

  /**
   * Sends fog to the player.
   * @param type Type of fog.
   * @param fogId Minecraft fog id.
   * @param globalId Minecraft globalId.
   */
  public sendFog(type: FogType, fogId: string, globalId: string): void {
    this.executeCommand(`fog @s ${type} ${fogId} ${globalId}`)
  }

  /**
   * Executes a command as the player.
   * @param cmd Command to run.
   * @param debug Send debug error to content log.
   * @returns
   */
  public executeCommand<T>(cmd: string, debug = false): ServerCommandResponse<T> {
    try {
      // Try execute the command.
      const command = this._IPlayer.runCommand(cmd) as ServerCommandResponse<T>

      // If we can return here it was successful
      return {
        statusMessage: command.statusMessage,
        data: command as unknown as T,
        err: false,
      }
    } catch (error) {
      // If debug pipe error.
      if (debug) console.debug(`[BeAPI] [Player] [executeCommand]: ${String(error)}`)

      // Return error data.
      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }

  /**
   * Execute a function as the player.
   * @param path Path of the function file.
   * @returns true means success
   */
  public executeFunction(path: string): boolean {
    const command = this.executeCommand(`function ${path}`)
    if (command.err) return false
    return true
  }

  /**
   * Attempts to get the score of the player on an objective.
   * @param objective Objective to use.
   * @returns
   */
  public getScore(objective: Objective): number {
    const command = this.executeCommand(`scoreboard players test @s "${objective.id}" * *`)
    if (command.err) return 0

    return parseInt(String(command.statusMessage?.split(' ')[1]), 10)
  }

  /**
   * Attempts to set the score of the player on an objective.
   * @param objective Objective to use.
   * @param amount New score.
   * @returns
   */
  public setScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players set @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Attempts to add score to the player on an objective.
   * @param objective Objective to use.
   * @param amount Amount to add.
   * @returns
   */
  public addScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players add @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Attempts to remove score from the player on an objective.
   * @param objective Objective to use.
   * @param amount Amount to remove.
   * @returns
   */
  public removeScore(objective: Objective, amount: number): number {
    this.executeCommand(`scoreboard players remove @s "${objective.id}" ${amount}`)

    return this.getScore(objective)
  }

  /**
   * Sets the players gamemode to something different.
   * @param gamemode Gamemode to set player to.
   * @returns true means success
   */
  public setGamemode(gamemode: Gamemode): boolean {
    if (gamemode === this.getGamemode()) return true
    const command = this.executeCommand(`gamemode ${gamemode}`)
    if (command.err) return false
    return true
  }

  /**
   * Gets the players current gamemode.
   * @returns
   */
  public getGamemode(): Gamemode {
    const gmc = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=c]`, this.getDimension().getId())
    const gma = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=a]`, this.getDimension().getId())
    const gms = this._client.executeCommand(`testfor @a[name="${this.getNameTag()}",m=s]`, this.getDimension().getId())
    if (!gmc.err) return 'creative'
    if (!gma.err) return 'adventure'
    if (!gms.err) return 'survival'

    return 'unknown'
  }

  /**
   * Gets the players current location.
   * @returns
   */
  public getLocation(): Location {
    const pos = this._IPlayer.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y),
      z: Math.floor(pos.z),
    }
  }

  /**
   * Gets precise location (decimals)
   * @returns
   */
  public getPreciseLocation(): Location {
    const pos = this._IPlayer.location

    return {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    }
  }

  /**
   * Gets the players current dimension.
   * @returns
   */
  public getDimension(): Dimension {
    return this._client.world.getDimension(this._IPlayer.dimension)
  }

  /**
   * Gets the players inventory.
   * @returns
   */
  public getInventory(): EntityInventory {
    return new EntityInventory(
      this._client,
      this._IPlayer.getComponent('minecraft:inventory') as EntityInventoryComponent,
    )
  }

  /**
   * Gets players selected slot in hotbar.
   * @returns
   */
  public getSelectedSlot(): number {
    return this._IPlayer.selectedSlot
  }

  /**
   * Gets the players health.
   * @returns
   */
  public getHealth(): EntityHealthComponent {
    return this._IPlayer.getComponent('minecraft:health') as EntityHealthComponent
  }

  /**
   * Kicks the player from the game.
   * @param reason Reason for being kicked.
   */
  public kick(reason = 'You were kicked from the game!'): void {
    this.destroy(reason)
  }

  /**
   * Get the players velocity.
   * @returns
   */
  public getVelocity(): Vector {
    return this._IPlayer.velocity
  }

  /**
   * Set the players velocity.
   * @param velocity New velocity.
   */
  public setVelocity(velocity: Vector): void {
    this._IPlayer.setVelocity(velocity)
  }

  /**
   * Teleports the player.
   * @param location Location to teleport player to.
   * @param dimension Dimension to teleport player to.
   * @param xrot X rotation to face when teleported.
   * @param yrot Y rotation to face when teleported
   */
  public teleport(location: Location, dimension: DimensionNamespace, xrot: number, yrot: number): void {
    const loc = new ILocation(location.x, location.y, location.z)
    this._IPlayer.teleport(loc, this._client.world.getDimension(dimension).getIDimension(), xrot, yrot)
  }

  /**
   * Teleports the player facing at ccertain coordinates.
   * @param location Location to teleport the player to.
   * @param dimension Dimension to teleport player to.
   * @param facingLocation Location to make player face.
   */
  public teleportFacing(location: Location, dimension: DimensionNamespace, facingLocation: Location): void {
    const loc = new ILocation(location.x, location.y, location.z)
    const loc2 = new ILocation(facingLocation.x, facingLocation.y, facingLocation.z)
    this._IPlayer.teleportFacing(loc, this._client.world.getDimension(dimension).getIDimension(), loc2)
  }

  /**
   * Trigger an event on the player.
   * @param event Minecraft player event.
   */
  public triggerEvent(event: string): void {
    this._IPlayer.triggerEvent(event)
  }

  /**
   * Get the players rotation.
   * @returns
   */
  public getRotation(): number {
    return this._IPlayer.bodyRotation
  }

  /**
   * Get the players head location.
   * @returns
   */
  public getHeadLocation(): ILocation {
    return this._IPlayer.headLocation
  }

  /**
   * Get a player NBT component.
   * @param component Minecraft NBT component name.
   * @returns
   */
  public getComponent<K extends keyof PlayerComponents>(component: K): PlayerComponents[K] {
    return this._IPlayer.getComponent(component) as PlayerComponents[K]
  }

  /**
   * Checks if the player has an NBT component.
   * @param component Minecraft NBT component name.
   * @returns
   */
  public hasComponent<K extends keyof PlayerComponents>(component: K): boolean {
    return this._IPlayer.hasComponent(component)
  }

  /**
   * Adds a potion effect to the player.
   * @param effect Minecraft EffectType.
   * @param duration Length effect should last.
   * @param amplifier Amplifier of effect.
   * @returns
   */
  public addEffect(effect: EffectType, duration: number, amplifier: number): void {
    return this._IPlayer.addEffect(effect, duration, amplifier)
  }

  /**
   * Gets a potion effect on the player.
   * @param effect Minecraft EffectType.
   * @returns
   */
  public getEffect(effect: EffectType): Effect {
    return this._IPlayer.getEffect(effect)
  }

  /**
   * Sets a cooldown on an item.
   * @param itemCategory Item category or name.
   * @param ticks Length of cooldown in ticks.
   */
  public setItemCooldown(itemCategory: string, ticks: number): void {
    this._IPlayer.startItemCooldown(itemCategory, ticks)
  }

  /**
   * Gets a cooldown on an item.
   * @param itemCategory Item category or name.
   * @returns
   */
  public getItemCooldown(itemCategory: string): number {
    return this._IPlayer.getItemCooldown(itemCategory)
  }

  /**
   * Gets the players expierence value.
   * @returns
   */
  public getXp(): number {
    const command = this.executeCommand<{ level: number }>('xp 0 @s')

    return command.data?.level ?? 0
  }

  /**
   * Adds expierence levels to the player.
   * @param level Levels to add.
   * @returns
   */
  public addXpLevel(level: number): number {
    const command = this.executeCommand<{ level: number }>(`xp ${level}l @s`)

    return command.data?.level ?? 0
  }

  /**
   * Removes expierence levels from the player.
   * @param level Levels to remove.
   * @returns
   */
  public removeXpLevel(level: number): number {
    const command = this.executeCommand<{ level: number }>(`xp -${level}l @s`)

    return command.data?.level ?? 0
  }

  /**
   * Adds a decimal amount of expierence to the player.
   * @param level Decimal to add.
   * @returns
   */
  public addXpFloat(level: number): number {
    const command = this.executeCommand<{ level: number }>(`xp ${level} @s`)

    return command.data?.level ?? 0
  }

  /**
   * Removes a decimal amount of expierence from the player.
   * @param level Decimal to remove.
   * @returns
   */
  public removeXpFloat(level: number): number {
    const command = this.executeCommand<{ level: number }>(`xp -${level} @s`)

    return command.data?.level ?? 0
  }

  /**
   * Shakes the players camera.
   * @param type Type of shakage.
   * @param intensity Intensity of shakage.
   * @param seconds Length of shakage.
   */
  public shakeCamera(type: CameraShakeType, intensity?: number, seconds?: number): void {
    if (type === 'clear') {
      this.executeCommand('camerashake stop @s')
    } else {
      this.executeCommand(`camerashake add @s ${intensity ?? 1} ${seconds ?? 1} ${type}`)
    }
  }

  /**
   * Attempts to set the players spawn point.
   * @param location Location to set spawn point.
   * @returns true means success
   */
  public setSpawnPoint(location: Location): boolean {
    const command = this.executeCommand(`spawnpoint @s ${location.x} ${location.y} ${location.z}`)
    if (command.err) return false
    return true
  }

  /**
   * Gets the players sneaking status.
   * @returns
   */
  public isSneaking(): boolean {
    return this._IPlayer.isSneaking
  }

  /**
   * Gets the players swimming status.
   */
  public isSwimming(): boolean
  public isSwimming(val: boolean): void
  public isSwimming(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isSwimming = val
    } else return this._isSwimming
  }

  /**
   * Gets the players in water status.
   */
  public isInWater(): boolean
  public isInWater(val: boolean): void
  public isInWater(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isInWater = val
    } else return this._isInWater
  }

  /**
   * Gets the players Grounded status.
   */
  public isGrounded(): boolean
  public isGrounded(val: boolean): void
  public isGrounded(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isGrounded = val
    } else return this._isGrounded
  }

  /**
   * Gets the players burning status.
   */
  public isBurning(): boolean
  public isBurning(val: boolean): void
  public isBurning(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isBurning = val
    } else return this._isBurning
  }

  /**
   * Gets the players moving status.
   */
  public isMoving(): boolean
  public isMoving(val: boolean): void
  public isMoving(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isMoving = val
    } else return this._isMoving
  }

  /**
   * Gets the players sprinting status.
   */
  public isSprinting(): boolean
  public isSprinting(val: boolean): void
  public isSprinting(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isSprinting = val
    } else return this._isSprinting
  }

  /**
   * Gets the players riding status.
   */
  public isRiding(): boolean
  public isRiding(val: boolean): void
  public isRiding(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isRiding = val
    } else return this._isRiding
  }

  /**
   * Gets the players sleeping status.
   */
  public isSleeping(): boolean
  public isSleeping(val: boolean): void
  public isSleeping(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isSleeping = val
    } else return this._isSleeping
  }

  /**
   * Gets the players alive status.
   */
  public isAlive(): boolean
  public isAlive(val: boolean): void
  public isAlive(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isAlive = val
    } else return this._isAlive
  }

  /**
   * Gets the players muted status.
   */
  public isMuted(): boolean
  public isMuted(val: boolean): void
  public isMuted(val?: boolean): boolean | void {
    if (typeof val === 'boolean') {
      this._isMuted = val
    } else return this._isMuted
  }

  /**
   * Gets a property on the Player.
   * @param {id} id ID of property.
   * @returns {PropertyValue} Value of the property.
   */
  public getProperty(id: string): PropertyValue {
    return this._IPlayer.getDynamicProperty(id)
  }

  /**
   * Sets the value of a property.
   * @param {id} id ID of property.
   * @param {PropertyValue} value Value for the property.
   * @returns {void}
   */
  public setProperty(id: string, value: PropertyValue): void {
    return this._IPlayer.setDynamicProperty(id, value)
  }

  /**
   * Removes a property.
   * @param {string} id ID of property.
   * @returns {boolean}
   */
  public removeProperty(id: string): boolean {
    return this._IPlayer.removeDynamicProperty(id)
  }
}
