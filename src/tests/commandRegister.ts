import { commands } from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "ping",
  description: "Ping the server.",
  aliases: ["p"],
}, (data) => {
  data.sender.sendMessage("§ePong!")
})
