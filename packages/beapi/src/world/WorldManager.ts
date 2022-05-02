// Normal imports.
import { World as IWorld, world, Dimension as IDimension, ItemStack, MinecraftItemTypes } from 'mojang-minecraft'
import { Dimension, snakeCaseToCamelCase, Item, ItemTypes } from '..'

// Type imports.
import type { Difficulty, Weather, DimensionNamespace, PropertyValue, CamelToSnakeCase } from '..'
import type { Tick } from '../events/Tick'
import type { Client } from '../client'

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
   * Private world reference.
   */
  protected readonly _IWorld: IWorld

  /**
   * Private map of all dimensions.
   */
  protected readonly _dimensions = new Map<DimensionNamespace, Dimension>()

  /**
   * World Manager is the primary interaction point for world related
   * methods that had no other categorization placing.
   * @param {Client} client
   */
  public constructor(client: Client) {
    // Assign private client reference.
    this._client = client
    // Assign private world reference.
    this._IWorld = world
    // Add dimensions to the map.
    this._dimensions.set('minecraft:overworld', new Dimension(this._client, this._IWorld.getDimension('overworld')))
    this._dimensions.set('minecraft:nether', new Dimension(this._client, this._IWorld.getDimension('nether')))
    this._dimensions.set('minecraft:the_end', new Dimension(this._client, this._IWorld.getDimension('the end')))
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
   * Gets a world dimension by its name.
   * @param {Dimension} dimension World dimension to use.
   * @returns {IDimension}
   */
  public getDimension(dimension: DimensionNamespace | IDimension): Dimension {
    if (dimension instanceof IDimension) {
      return this._dimensions.get(dimension.id as DimensionNamespace)!
    }
    return this._dimensions.get(dimension)!
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
   * Gets a property on the World.
   * @param {id} id ID of property.
   * @returns {PropertyValue} Value of the property.
   */
  public getProperty(id: string): PropertyValue {
    return this._IWorld.getDynamicProperty(id)
  }

  /**
   * Sets the value of a property.
   * @param {id} id ID of property.
   * @param {PropertyValue} value Value for the property.
   * @returns {void}
   */
  public setProperty(id: string, value: PropertyValue): void {
    return this._IWorld.setDynamicProperty(id, value)
  }

  /**
   * Removes a property.
   * @param {string} id ID of property.
   * @returns {boolean}
   */
  public removeProperty(id: string): boolean {
    return this._IWorld.removeDynamicProperty(id)
  }

  /**
   * Creates a new item.
   * @param {CamelToSnakeCase<ItemType>} type Item type.
   * @param {number} amount Item amount.
   * @param {number} data Item data value.
   * @returns {Item}
   */
  public createItem(type: CamelToSnakeCase<ItemTypes>, amount = 1, data = 1): Item {
    const convert = snakeCaseToCamelCase<ItemTypes>(type)
    const stack = new ItemStack(MinecraftItemTypes[convert], amount, data)
    const item = new Item(this._client, stack)

    return item
  }

  /**
   * Gets the current tick of the server.
   * @returns Current tick as a number.
   */
  public getCurrentTick(): number {
    const event = this._client.getEvent('Tick') as Tick

    return event.getCurrentTick()
  }
}
