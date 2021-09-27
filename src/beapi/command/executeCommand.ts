import {
  Commands,
  World,
} from 'mojang-minecraft'
import { Demensions } from '../../types/BeAPI.i'

function executeCommand(command: string, dimension?: Demensions, debug = false): {statusMessage?: any, err?: boolean} {
  try {
    if (!dimension) dimension = "overworld"

    return Commands.run(command, World.getDimension(dimension))
  } catch (err) {
    if (!debug) return {
      statusMessage: "Error Occured",
      err: true,
    }
    Commands.run(`say ${err}`, World.getDimension(dimension))

    return {
      statusMessage: "Error Occured",
      err: true,
    }
  }
}

export {
  executeCommand,
}
