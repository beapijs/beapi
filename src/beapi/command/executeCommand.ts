import {
  Commands,
  World,
} from 'mojang-minecraft'
import { Demensions } from '../../types/BeAPI.i'

function executeCommand(command: string, dimension?: Demensions, debug = false): {statusMessage: any} {
  try {
    if (!dimension) dimension = "overworld"

    return Commands.run(command, World.getDimension(dimension))
  } catch (err) {
    if (!debug) return
    Commands.run(`say ${err}`, World.getDimension(dimension))
  }
}

export {
  executeCommand,
}
