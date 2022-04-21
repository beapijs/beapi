// Regular imports.
import { Player, Client } from '..'

// Type imports.
import type { Player as IPlayer } from 'mojang-minecraft'

/**
 * Player manager is the main hub for interacting with
 * players inside the world currently.
 */
export class PlayerManager {
  /**
   * Protected player map.
   */
  protected readonly _players = new Map<string, Player>()
  /**
   * Protected client circular reference.
   */
  protected readonly _client: Client
  /**
   * Current BeAPI runtime id.
   */
  protected _runtimeId = 0

  /**
   * Player manager is the main hub for interacting with
   * players inside the world currently.
   * @param client Client reference.
   */
  public constructor(client: Client) {
    this._client = client
  }

  /**
   * Creates a new runtime id that can be used.
   * *Two ids will not overlap in the same runtime
   * but can overlap in two different runtimes.*
   * @returns
   */
  public newRuntimeId(): number {
    return this._runtimeId++
  }

  /**
   * Adds a player to the player manager.
   * @param player Player to add.
   */
  public add(player: Player): void {
    this._players.set(player.getName(), player)
  }

  /**
   * Creates a new player from a Minecraft IPlayer.
   * @param player IPlayer object.
   * @returns
   */
  public create(player: IPlayer): Player {
    return new Player(this._client, player)
  }

  /**
   * Removes a player from the player manager.
   *
   * WARNING: Please do not remove players this way.
   * If you want to remove a player, get them and call
   * `Player.destroy()`! Removing them this way
   * when they are still in the world will
   * most likely cause issues.
   *
   * @param player Player to remove.
   */
  public remove(player: Player) {
    this._players.delete(player.getName())
  }

  /**
   * Removes a player from the player manager.
   *
   * WARNING: Please do not remove players this way.
   * If you want to remove a player, get them and call
   * `Player.destroy()`! Removing them this way
   * when they are still in the world will
   * most likely cause issues.
   *
   * @param playerName Player to remove.
   */
  public removeByName(playerName: string) {
    this._players.delete(playerName)
  }

  /**
   * Gets all players currently in the world
   * as a map.
   * @returns
   */
  public getAll(): Map<string, Player> {
    return this._players
  }

  /**
   * Gets all players currently in the world
   * as an array.
   * @returns
   */
  public getAllAsArray(): Player[] {
    return Array.from(this.getAll().values())
  }

  /**
   * Attempts to get a player by their name.
   * @param playerName Name of the player.
   * @returns can return `undefined`
   */
  public getByName(playerName: string): Player | undefined {
    return this._players.get(playerName)
  }

  /**
   * Attempts to get a player by their name tag.
   * @param nameTag Name tag of player.
   * @returns can return `undefined`
   */
  public getByNameTag(nameTag: string): Player | undefined {
    return Array.from(this._players.values()).find((p) => p.getNameTag() === nameTag)
  }

  /**
   * Attempts to get a player by their Minecraft IPlayer object.
   * @param IPlayer Minecraft IPlayer object.
   * @returns can return `undefined`
   */
  public getByIPlayer(IPlayer: IPlayer): Player | undefined {
    return Array.from(this._players.values()).find((p) => p.getIPlayer() === IPlayer)
  }
}
