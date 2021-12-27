import {
  Player,
  events,
} from "../beapi/BeAPI.js"

events.on("ItemUseOn", (data) => {
  const player = data.source as Player
  if (player.getGamemode() !== "adventure" || data.block.id !== "minecraft:chest") return
  
  return data.cancelEvent()
})
