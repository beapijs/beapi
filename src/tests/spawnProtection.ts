import {
  events,
  Player,
} from '../beapi/BeAPI.js'

events.on("ItemUseOn", (data) => {
  const player = data.source as Player
  const check = checkArea([0, 0], [10, 10], [data.block.location.x, data.block.location.z])
  if (!check) return
  if (player.hasTag("admin")) return
  data.source.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§cYou don't have permission to perform that action!"}]}`)

  return data.cancelEvent()
})

function between(a: number, b: number, num: number): boolean {
  const max = Math.max(a, b)
  const min = Math.min(a, b)

  return num >= min && num <= max
}

function checkArea(a: [number, number], b: [number, number], event: [number, number]): boolean {
  const [ax, az] = a
  const [bx, bz] = b
  const [ex, ez] = event

  return between(ax, bx, ex) && between(az, bz, ez)
}
