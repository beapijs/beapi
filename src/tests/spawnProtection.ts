import {
  events,
  Player,
  socket,
  getAllDatabases,
} from '../beapi/BeAPI.js'

// TODO: Cancel block break events once implemented.

events.on("ItemUseOn", (data) => {
  const player = data.source as Player
  if (player.hasTag("admin")) return
  data.source.executeCommand(`titleraw @s actionbar {"rawtext":[{"text":"§cYou don't have permission to perform that action!"}]}`)

  return data.cancelEvent()
})
