import {
  Commands,
  World,
} from 'mojang-minecraft'

function executeCommand(command: string, dimension?: "overworld" | 'nether' | "the end", debug = false): {statusMessage: any} {
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
