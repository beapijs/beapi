import { Commands } from 'Minecraft'
import { log } from '../logger/log.js'

/**
 * Executes a given command.
 * @param {string} command - Command to execute.
 * @returns {{statusMessage: string}}
 */
function executeCommand(command) {
  try {
    return Commands.run(command)
  } catch (error) {
    log(error)
  }
}

export {
  executeCommand,
}