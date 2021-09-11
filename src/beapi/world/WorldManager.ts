import { executeCommand } from '../command/executeCommand.js'
import { events } from '../events/EventManager.js'

export class WorldManager {
  public getTicks(): number {
    return events.getEvents().get('tick').ticks
  }
  public sendMessage(message: string): void {
    executeCommand(`tellraw @a {"rawtext":[{"text":"${message}"}]}`)
  }
}

const world = new WorldManager()

export {
  world,
}
