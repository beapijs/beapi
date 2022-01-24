import { world } from 'mojang-minecraft'
import type { ServerCommandResponse } from '..'
import type { Dimension } from '../types'

export function runCommand(cmd: string, dimension: Dimension = 'overworld', debug = false): ServerCommandResponse {
  try {
    const command = world.getDimension(dimension).runCommand(cmd)

    return {
      statusMessage: command.statusMessage,
      data: command,
      err: false,
    }
  } catch (error) {
    if (debug) console.warn(`[BeAPI] [executeCommand]: ${String(error)}`)

    return {
      statusMessage: String(error),
      data: null,
      err: true,
    }
  }
}
