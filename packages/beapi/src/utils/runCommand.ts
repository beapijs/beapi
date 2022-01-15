import { world } from 'mojang-minecraft'
import type { ServerCommandResponse } from '..'

export function runCommand(cmd: string, debug = false): ServerCommandResponse {
  try {
    const command = world.getDimension('overworld').runCommand(cmd)

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
