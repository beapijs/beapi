import {
  Commands,
  World,
} from 'mojang-minecraft'

function executeCommand(command: string, debug = false): {statusMessage: any} {
  try {
    return Commands.run(command, World.getDimension('overworld'))
  } catch (err) {
    if (!debug) return
    Commands.run(`say ${err}`, World.getDimension('overworld'))
  }
}

export {
  executeCommand,
}
