// Regular imports.
import { world } from 'mojang-minecraft'

// Type imports.
import type { ServerCommandResponse } from '..'
import type { Dimension } from '../types'

/**
 * Standalone method for running a command. Worlds the same as `Client#runCommand`.
 * @param {string} cmd Command to execute.
 * @param {Dimension} dimension Dimension to use.
 * @param {boolean} debug Pipe errors to content log?
 * @returns {ServerCommandResponse}
 */
export function runCommand<T>(
  cmd: string,
  dimension: Dimension = 'overworld',
  debug = false,
): ServerCommandResponse<T> {
  try {
    // Try execute command.
    const command = world.getDimension(dimension).runCommand(cmd)

    // If able to return ServerCommandResponse
    // Then successful execute
    return {
      statusMessage: command.statusMessage,
      data: command,
      err: false,
    }
  } catch (error) {
    // If debug error then do so.
    if (debug) console.debug(`[runCommand] [error] (standalone): ${String(error)}`)

    // Return error data.
    return {
      statusMessage: String(error),
      data: null,
      err: true,
    }
  }
}
