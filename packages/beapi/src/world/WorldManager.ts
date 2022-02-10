import type { Client } from '../client'
import type { Dimension, Location } from '../types'
import type { Entity } from '../entity'
import type { Player } from '../player'
import { Block, BlockLocation, world, Dimension as IDimension } from 'mojang-minecraft'
export class WorldManager {
  protected readonly _client: Client
  public constructor(client: Client) {
    this._client = client
  }

  public sendMessage(msg: string): void {
    this._client.executeCommand(`tellraw @a {"rawtext":[{"text":"${msg}"}]}`)
  }

  public getEntitiesFromLocation(dimension: Dimension, location: Location): Entity[] {
    const entities = Array.from(this._client.entities.getAll().values()).filter(
      (x) => x.getLocation() === location && x.getDimensionName() === dimension,
    )

    return entities
  }

  public getPlayersFromLocation(dimension: Dimension, location: Location): Player[] {
    const players = Array.from(this._client.players.getAll().values()).filter(
      (x) => x.getLocation() === location && x.getDimensionName() === dimension,
    )

    return players
  }

  public spawnEntity(id: string, location: Location, dimension: Dimension): Entity | undefined {
    const entity = this.getDimension(dimension).spawnEntity(id, new BlockLocation(location.x, location.y, location.z))
    return this._client.entities.getByIEntity(entity)
  }

  public getBlock(dimension: Dimension, location: Location): Block {
    return world.getDimension(dimension).getBlock(new BlockLocation(location.x, location.y, location.z))
  }

  public getDimension(dimension: Dimension): IDimension {
    return world.getDimension(dimension)
  }
}
