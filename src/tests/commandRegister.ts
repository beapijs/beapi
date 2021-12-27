import { commands } from '../beapi/BeAPI.js'

// TEST: Registers ping to the command list

commands.registerCommand({
  command: "ping",
  description: "Ping the server.",
  aliases: ["p"],
}, (data) => {
  data.sender.sendMessage("§ePong!")
})

// TEST: Registers secret as a hidden command

commands.registerCommand({
  command: "secret",
  description: "This is a secret command.",
  aliases: ["s"],
  showInList: false,
}, (data) => {
  data.sender.sendMessage("§cDon't tell nobody!")
})
