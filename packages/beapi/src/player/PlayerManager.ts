import { Player } from './'
import type { Player as IPlayer } from 'mojang-minecraft'
import type { Client } from '../client'
export class PlayerManager {
  protected readonly _players = new Map<string, Player>()
  protected readonly _client: Client

  public constructor(client: Client) {
    this._client = client
  }

  public add(player: Player): void {
    this._players.set(player.getName(), player)
  }

  public create(player: IPlayer): Player {
    return new Player(this._client, player)
  }

  public remove(player: Player) {
    this._players.delete(player.getName())
  }

  public removeByName(playerName: string) {
    this._players.delete(playerName)
  }

  public getAll(): Map<string, Player> {
    return this._players
  }

  public getByName(playerName: string): Player | undefined {
    return this._players.get(playerName)
  }

  public getByNameTag(nameTag: string): Player | undefined {
    return Array.from(this._players.values()).find((p) => p.getNameTag() === nameTag)
  }

  public getByIPlayer(IPlayer: IPlayer): Player | undefined {
    return Array.from(this._players.values()).find((p) => p.getIPlayer() === IPlayer)
  }
}
