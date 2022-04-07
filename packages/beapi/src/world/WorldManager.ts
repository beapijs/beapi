// Normal imports.
import {
  BlockLocation,
  world,
  Dimension as IDimension,
  ItemStack,
  MolangVariableMap,
  Location as ILocation,
  ExplosionOptions,
} from 'mojang-minecraft'
import { Block, Permutation } from '../block'

// Type imports.
import type { Difficulty, Dimension, Weather, Location, PropertyValue } from '../types'
import type { Client } from '../client'
import type { Entity } from '../entity'
import type { Player } from '../player'

/**
 * World Manager is the primary interaction point for world related
 * methods that had no other categorization placing.
 */
export class WorldManager {
  /**
   * Private client reference.
   */
  protected readonly _client: Client

  /**
   * World Manager is the primary interaction point for world related
   * methods that had no other categorization placing.
   * @param {Client} client
   */
  public constructor(client: Client) {
    // Assign private client reference.
    this._client = client
  }

  /**
   * Broadcasts a message to everyone.
   * @param {string} message Message to send.
   */
  public sendMessage(message: string): void {
    // Execute tellraw, replace all (") with escaping (\\"). Otherwise command will parse incorrectly.
    this._client.executeCommand(`tellraw @a {"rawtext":[{"text":"${message.replace(/"/g, '\\"')}"}]}`)
  }

  /**
   * Gets all entities from a specfic world location.
   * @param {Dimension} dimension Dimension to check.
   * @param {Location} location Location to check.
   * @returns {Entity[]}
   */
  public getEntitiesFromLocation(dimension: Dimension, location: Location): Entity[] {
    // Return an array from all entities in the entity manager and create a filter.
    return Array.from(this._client.entities.getAll().values()).filter(
      // If entity location === given location and entity dimension === given
      // dimension return true which will push entity to final array
      (x) => x.getLocation() === location && x.getDimensionName() === dimension,
    )
  }

  /**
   * Gets all players from a specfic world location.
   * @param {Dimension} dimension Dimension to check.
   * @param {Location} location Location to check.
   * @returns {Player[]}
   */
  public getPlayersFromLocation(dimension: Dimension, location: Location): Player[] {
    // Return an array from all players in the player manager and create a filter.
    return Array.from(this._client.players.getAll().values()).filter(
      // If player location === given location and player dimension === given
      // dimension return true which will push player to final array
      (x) => x.getLocation() === location && x.getDimensionName() === dimension,
    )
  }

  /**
   * Spawns an entity in a certain world location.
   * @param {string} id Minecraft entity identifier.
   * @param {Location} location World location to use.
   * @param {Dimension} dimension World dimension to use.
   * @returns {Entity | undefined}
   */
  public spawnEntity(id: string, location: Location, dimension: Dimension): Entity | undefined {
    // Get IDimension and spawn new entity at block location given.
    const entity = this.getDimension(dimension).spawnEntity(id, new BlockLocation(location.x, location.y, location.z))
    // Return attempt get entity spawned above from entity manager.
    return this._client.entities.getByIEntity(entity)
  }

  /**
   * Spawns an item in a certain world location.
   * @param {ItemStack} item Minecraft item stack.
   * @param {Location} location World location to use.
   * @param {Dimension} dimension World dimension to use.
   * @returns {Entity | undefined}
   */
  public spawnItem(item: ItemStack, location: Location, dimension: Dimension): Entity | undefined {
    // Get IDimension and spawn new item at block location given.
    const entity = this.getDimension(dimension).spawnItem(item, new BlockLocation(location.x, location.y, location.z))
    // Return attempt get item spawned above from entity manager.
    return this._client.entities.getByIEntity(entity)
  }

  /**
   * Spawns a particle in a certain world location.
   * @param {string} id Minecraft particle identifier.
   * @param {Location} location World location to use.
   * @param {Dimension} dimension World dimension to use.
   * @param {MolangVariableMap} molangVarMap Particle molang variable map.
   */
  public spawnParticle(id: string, location: Location, dimension: Dimension, molangVarMap: MolangVariableMap): void {
    // Get IDimension and spawn new particle with parameters given.
    this.getDimension(dimension).spawnParticle(id, new ILocation(location.x, location.y, location.z), molangVarMap)
  }

  /**
   * Sets a block permutation world location.
   * @param {Location} location World location to use.
   * @param {Dimension} dimension World dimension to use.
   * @param {Permutation} permutation Minecraft permutation data.
   * @returns {Block}
   */
  public setBlockPermutation(location: Location, dimension: Dimension, permutation: Permutation): Block {
    // Get block from work with given location and dimension.
    const block = this.getBlock(location, dimension)
    // Set permutation of block with given permutation data.
    block.setPermutation(permutation)

    // Returns block with permutation applied.
    return block
  }

  /**
   * Gets a block from a world location.
   * @param {Location} location World location to use.
   * @param {Dimension} dimension World dimension to use.
   * @returns {Block}
   */
  public getBlock(location: Location, dimension: Dimension): Block {
    // Returns new BeAPI block contruct.
    return new Block(
      this._client,
      this.getDimension(dimension).getBlock(new BlockLocation(location.x, location.y, location.z)),
    )
  }

  /**
   * Gets a world dimension by its name.
   * @param {Dimension} dimension World dimension to use.
   * @returns {IDimension}
   */
  public getDimension(dimension: Dimension): IDimension {
    return world.getDimension(dimension)
  }

  /**
   * Attempts to get the world time by using `/time query daytime`.
   *
   * WARNING: Changes to this commands response in language files could
   * break its functionality.
   * @returns {number}
   */
  public getTime(): number {
    const command = this._client.executeCommand('time query daytime')
    if (command.err) return 0

    return parseInt(command.statusMessage.split(' ')[2], 10)
  }

  /**
   * Attempts to set the time to the given value.
   * @param {number} time New time to set.
   * @returns {boolean} `true` means successful
   */
  public setTime(time: number): boolean {
    return this._client.executeCommand(`time set ${time}`).err ? false : true
  }

  /**
   * Attempts to get the weather by using `/weather query`.
   *
   * WARNING: Changes to this commands response in language files could
   * break its functionality.
   * @returns {Weather}
   */
  public getWeather(): Weather {
    const command = this._client.executeCommand('weather query')
    if (command.err) return 'clear'

    return command.statusMessage.split(' ')[3] as Weather
  }

  /**
   * Attempts to set the weather to the given status.
   * @param {Weather} weather New weather status to set.
   * @returns {boolean} `true` means successful
   */
  public setWeather(weather: Weather): boolean {
    return this._client.executeCommand(`weather ${weather}`).err ? false : true
  }

  /**
   * Attempts to set the world difficulty.
   * @param {Difficulty} difficulty New difficulty to set.
   * @returns {boolean} `true` means successful
   */
  public setDifficulty(difficulty: Difficulty): boolean {
    return this._client.executeCommand(`difficulty ${difficulty}`).err ? false : true
  }

  /**
   * Attempts to create an explosion at given options.
   * @param {Location} location Location to use.
   * @param {number} radius How big the boom?
   * @param {Dimension} dimension Dimension to use.
   * @param {ExplosionOptions} options Extra boom boom options.
   */
  public createExplosion(location: Location, radius: number, dimension: Dimension, options: ExplosionOptions): void {
    this.getDimension(dimension).createExplosion(new ILocation(location.x, location.y, location.z), radius, options)
  }

  /**
   * Gets a property on the World.
   * @param {id} id ID of property.
   * @returns {PropertyValue} Value of the property.
   */
  public getProperty(id: string): PropertyValue {
    return (world as any).getDynamicProperty(id)
  }

  /**
   * Sets the value of a property.
   * @param {id} id ID of property.
   * @param {PropertyValue} value Value for the property.
   * @returns {boolean}
   */
  public setProperty(id: string, value: PropertyValue): boolean {
    return (world as any).setDynamicProperty(id, value)
  }

  /**
   * Removes a property.
   * @param {string} id ID of property.
   * @returns {boolean}
   */
  public removeProperty(id: string): boolean {
    return (world as any).removeDynamicProperty(id)
  }
}
