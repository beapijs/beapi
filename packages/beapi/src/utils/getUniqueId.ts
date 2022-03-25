import { genUuid } from '..'
import { client } from '../poly'
import type { Entity } from '..'

interface ParseResult {
  statusCode: string
  statusMessage: string
}

export function getUniqueId(entity: Entity): number {
  const objective = genUuid().substring(0, 16)
  client.executeCommand(`scoreboard objectives add "${objective}" dummy`)
  const { err, statusMessage } = entity.executeCommand(`scoreboard players test @s "${objective}" * *`)
  client.executeCommand(`scoreboard objectives remove "${objective}"`)
  if (!err) return 0

  const raw: ParseResult = JSON.parse(statusMessage) as ParseResult
  const id = Number(raw.statusMessage.split(' ')[1])

  return id
}
