import type {
  Client,
  DimensionType,
  ServerCommandResponse,
  Item,
  Location,
  Entity,
  Player,
  ParticleOptions,
  ExplosionOptions,
} from '..'
import {
  Dimension as IDimension,
  Location as ILocation,
  BlockLocation,
  MolangVariableMap,
  ExplosionOptions as IExplosionOptions,
  Color,
  Vector,
} from 'mojang-minecraft'
import { Block } from '../block'
import type { BlockTypes, CamelToSnakeCase } from '../types'

export class Dimension {
  protected readonly _client: Client
  protected readonly _IDimension: IDimension

  public constructor(client: Client, IDimension: IDimension) {
    this._client = client
    this._IDimension = IDimension
  }

  /**
   * Gets the vanilla dimension class.
   * @returns {IDimension}
   */
  public getIDimension(): IDimension {
    return this._IDimension
  }

  /**
   * Gets the id of the dimension.
   * @returns {DimensionType}
   */
  public getId(): DimensionType {
    return this._IDimension.id.split(':')[1].replace(/_/g, ' ') as DimensionType
  }

  /**
   * Executes a command in the dimension.
   * @param {string} cmd Command to execute.
   * @param {boolean} debug Option to log command results.
   * @returns {ServerCommandResponse} Returns the command response.
   */
  public executeCommand(cmd: string, debug = false): ServerCommandResponse {
    try {
      // Try execute command.
      const command = this._IDimension.runCommand(cmd)

      // If able to return ServerCommandResponse
      // Then successful execute
      return {
        statusMessage: command.statusMessage,
        data: command,
        err: false,
      }
    } catch (error) {
      // If debug error then do so.
      if (debug) console.debug(`[runCommand] [error] (standalone): ${String(error)}`)

      // Return error data.
      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }

  /**
   * Spawn an item.
   * @param {Item} item Item class to spawn.
   * @param {Location} location Location to spawn item.
   * @returns {Entity | undefined} Returns the spawned item.
   */
  public spawnItem(item: Item, location: Location): Entity | undefined {
    try {
      const entity = this._IDimension.spawnItem(item.getIItem(), new ILocation(location.x, location.y, location.z))

      return this._client.entities.getByIEntity(entity)
    } catch {
      return undefined
    }
  }

  /**
   * Spawn an entity.
   * @param {string} id Entity identifier.
   * @param {Location} location Location to spawn entity.
   * @returns {Entity | undefined} Returns the spawned entity.
   */
  public spawnEntity(id: string, location: Location): Entity | undefined {
    try {
      const entity = this._IDimension.spawnEntity(id, new ILocation(location.x, location.y, location.z))

      return this._client.entities.getByIEntity(entity)
    } catch {
      return undefined
    }
  }

  /**
   * Spawn a particle.
   * @param {string} id Particle identifier.
   * @param {Location} location Location to spawn particle.
   */
  public spawnParticle(id: string, location: Location, options?: ParticleOptions[]): void {
    const variableMap = new MolangVariableMap()
    if (options) {
      for (const option of options) {
        switch (option.type) {
          case 'RGB':
            variableMap.setColorRGB(option.id, option.color ?? new Color(0, 0, 0, 0))
            break
          case 'RGBA':
            variableMap.setColorRGBA(option.id, option.color ?? new Color(0, 0, 0, 0))
            break
          case 'SpeedAndDirection':
            variableMap.setSpeedAndDirection(option.id, option.speed ?? 0, option.vector ?? new Vector(0, 0, 0))
            break
          case 'Vector':
            variableMap.setVector3(option.id, option.vector ?? new Vector(0, 0, 0))
            break
        }
      }
    }

    this._IDimension.spawnParticle(id, new ILocation(location.x, location.y, location.z), variableMap)
  }

  /**
   * Get all the players in the dimension.
   * @returns {Player[]}
   */
  public getPlayers(): Player[] {
    return this._client.players.getAllAsArray().filter((x) => x.getDimension().getId() === this.getId())
  }

  /**
   * Get all entities in the dimension.
   * @returns {Entity[]}
   */
  public getEntities(): Entity[] {
    return this._client.entities.getAllAsArray().filter((x) => x.getDimension().getId() === this.getId())
  }

  /**
   * Get a block in the dimension.
   * @param {Location} location Location of the block.
   * @returns {Block} Returns the block.
   */
  public getBlock(location: Location): Block {
    return new Block(this._client, this._IDimension.getBlock(new BlockLocation(location.x, location.y, location.z)))
  }

  /**
   * Set a block in the dimension.
   * @param location Location to set the block.
   * @param type The block type to set.
   * @returns {Block} Returns the set block.
   */
  public setBlock(location: Location, block: CamelToSnakeCase<BlockTypes> | Block): Block {
    const selected = this.getBlock(location)
    if (block instanceof Block) {
      selected.setType(block.getType())
      selected.setPermutation(block.getPermutation())
      return selected
    }
    selected.setType(block)
    return selected
  }

  /**
   * Creates a explosion in the dimension.
   * @param {Location} location Location of the explosion.
   * @param {number} radius Radius of the explosion.
   */
  public createExplosion(location: Location, radius: number, options?: ExplosionOptions): void {
    const explosionOptions = new IExplosionOptions()
    if (options) {
      explosionOptions.allowUnderwater = options.allowUnderwater
      explosionOptions.breaksBlocks = options.breaksBlocks
      explosionOptions.causesFire = options.causesFire
      explosionOptions.source = options.source.getIEntity()
    }

    this._IDimension.createExplosion(new ILocation(location.x, location.y, location.z), radius, explosionOptions)
  }
}
