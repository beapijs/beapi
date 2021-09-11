import {
  World,
  BlockLocation,
  Entity,
} from 'Minecraft'
import { Location } from '../../types/BeAPI.i'
import { executeCommand } from '../command/executeCommand.js'
import { events } from '../events/EventManager.js'

export class WorldManager {
  public getTicks(): number {
    return events.getEvents().get('tick').ticks
  }
  public sendMessage(message: string): void {
    executeCommand(`tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }
  public getEntities(dimension: "overworld" | "nether" | "the end", location: Location): Entity[] {
    return World.getDimension(dimension).getEntitiesAtBlockLocation(new BlockLocation(location.x, location.y, location.z))
  }
}

const world = new WorldManager()

export {
  world,
}
