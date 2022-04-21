// Regular imports.
import { genUuid, runCommand, Entity } from '..'

interface ParseResult {
  statusCode: string
  statusMessage: string
}

/**
 * Attempts to get the minecraft assigned unique id for
 * the given entity.
 * @param entity Entity to try get id for.
 * @returns
 */
export function getUniqueId(entity: Entity): number {
  const objective = genUuid().substring(0, 16)
  runCommand(`scoreboard objectives add "${objective}" dummy`)
  const { err, statusMessage } = entity.executeCommand(`scoreboard players test @s "${objective}" * *`)
  runCommand(`scoreboard objectives remove "${objective}"`)
  if (!err) return 0

  const raw: ParseResult = JSON.parse(statusMessage) as ParseResult
  const id = Number(raw.statusMessage.split(' ')[1])

  return id
}
