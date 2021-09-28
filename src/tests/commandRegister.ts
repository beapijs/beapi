import { commands } from '../beapi/BeAPI.js'

// TEST: Registers ping command

commands.registerCommand({
  command: "ping",
  description: "Ping the server.",
  aliases: ["p"],
}, (data) => {
  data.sender.sendMessage("§ePong!")
})
