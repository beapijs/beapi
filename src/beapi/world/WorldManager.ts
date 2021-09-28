import {
  World,
  BlockLocation,
  Entity as MCEntity,
} from 'mojang-minecraft'
import {
  Demensions,
  Location,
} from '../../types/BeAPI.i'
import { executeCommand } from '../command/executeCommand.js'
import { events } from '../events/EventManager.js'

export class WorldManager {
  public getTicks(): number {
    return events.getEvents().get('tick').ticks
  }
  public sendMessage(message: string): void {
    executeCommand(`tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }
  public getEntities(dimension: Demensions, location: Location): MCEntity[] {
    return World.getDimension(dimension).getEntitiesAtBlockLocation(new BlockLocation(location.x, location.y, location.z))
  }
}

const world = new WorldManager()

export {
  world,
}
