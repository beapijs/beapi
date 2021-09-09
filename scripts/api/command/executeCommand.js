import { Commands } from 'Minecraft'

/**
 * Executes a given command.
 * @param {string} command - Command to execute.
 * @returns {{statusMessage: string}}
 */
function executeCommand(command) {
  try {
    return Commands.run(command)
  } catch (err) {
    Commands.run(`say ${err}`)
  }
}

export {
  executeCommand,
}