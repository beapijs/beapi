import {
  commands,
} from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "inv",
  description: "Get your inventory.",
}, (data) => {
  for (let slot = 0; slot != 36; slot++) {
    const item = data.sender.getInventory().getItem(slot)
    if (!item) continue
    data.sender.sendMessage(`Slot: ${slot}, Item: ${item.id}, Amount: ${item.amount}, Data: ${item.data}`)
  }
})
