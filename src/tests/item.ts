import {
  events,
  world,
} from '../beapi/BeAPI.js'

events.on("ItemUse", (data) => {
  world.sendMessage(`${data.source.getNameTag()} used ${data.item.id}`)
})

events.on("ItemUseOn", (data) => {
  world.sendMessage(`${data.source.getNameTag()} used ${data.item.id} on ${data.block.id} at ${data.block.location.x} ${data.block.location.y} ${data.block.location.z}`)
})
