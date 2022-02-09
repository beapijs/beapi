import { client, genUuid } from '..'
import type { Entity } from '..'

export function getUniqueId(entity: Entity): number {
  const objective = genUuid().substring(0, 16)
  client.executeCommand(`scoreboard objectives add "${objective}" dummy`)
  const { err, statusMessage } = entity.executeCommand(`scoreboard players test @s "${objective}" * *`)
  client.executeCommand(`scoreboard objectives remove "${objective}"`)
  if (!err) return 0

  const raw: { statusCode: string; statusMessage: string } = JSON.parse(statusMessage)
  const id = Number(raw.statusMessage.split(' ')[1])

  return id
}
