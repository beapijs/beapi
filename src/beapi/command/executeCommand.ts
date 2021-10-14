import {
  Commands,
  World,
} from 'mojang-minecraft'
import {
  ExecuteCommandResponse,
  Demensions,
} from '../../types/BeAPI.i'

function executeCommand(command: string, dimension?: Demensions, debug = false): ExecuteCommandResponse {
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
