import { world as World, BlockLocation, Entity as MCEntity } from 'mojang-minecraft'
import type { Dimensions, Location } from '../@types/BeAPI.i'
import type { Entity } from '../entity/Entity.js'
import { executeCommand } from '../command/executeCommand.js'
import { events } from '../events/EventManager.js'
import { entities } from '../index.js'

export class WorldManager {
  public constructor() {
    this.sendMessage('BeAPI in Development Mode...')
  }

  public getTicks(): number {
    return events.getEvents().get('tick').ticks
  }

  public sendMessage(message: string): void {
    executeCommand(`tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }

  public getEntities(dimension: Dimensions, location: Location): MCEntity[] {
    return World.getDimension(dimension).getEntitiesAtBlockLocation(
      new BlockLocation(location.x, location.y, location.z),
    )
  }

  public spawnEntity(entity: string, pos: Location, name = ''): Entity | undefined {
    executeCommand(`summon ${entity} "${name}" ${pos.x} ${pos.y} ${pos.z}`)
    const ent = entities.getLatestEntity()
    if (!ent) return

    return ent
  }
}

const world = new WorldManager()

export { world }
