import type { Client } from '../client'
import type { Dimension, Location } from '../types'
import { BlockLocation, Entity as IEntity, world } from 'mojang-minecraft'
import type { Entity } from '../entity'
export class WorldManager {
  protected readonly _client: Client
  public constructor(client: Client) {
    this._client = client
  }

  public sendMessage(msg: string): void {
    this._client.executeCommand(`tellraw @a {"rawtext":[{"text":"${msg}"}]}`)
  }

  public getEntities(dimension: Dimension, location: Location): IEntity[] {
    return world
      .getDimension(dimension)
      .getEntitiesAtBlockLocation(new BlockLocation(location.x, location.y, location.z))
  }

  public spawnEntity(entity: string, pos: Location, name = ''): Entity | undefined {
    this._client.executeCommand(`summon ${entity} "${name}" ${pos.x} ${pos.y} ${pos.z}`)
    return this._client.entities.getLastest()
  }
}
