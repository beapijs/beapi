import {
  Commands,
  World,
} from 'mojang-minecraft'
import {
  ExecuteCommandResponse,
  Dimensions,
} from '../../types/BeAPI.i'

function executeCommand(command: string, dimension?: Dimensions, debug = false): ExecuteCommandResponse {
  try {
    if (!dimension) dimension = "overworld"
    const cmd = Commands.run(command, World.getDimension(dimension))

    return {
      statusMessage: cmd.statusMessage,
      data: cmd,
      err: false,
    }
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
