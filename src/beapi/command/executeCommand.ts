import { Commands } from 'Minecraft'

function executeCommand(command: string, debug = false): {statusMessage: any} {
  try {
    return Commands.run(command)
  } catch (err) {
    if (!debug) return
    Commands.run(`say ${err}`)
  }
}

export {
  executeCommand,
}
