import { commands } from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "nick",
  description: "Update you nickname above your head.",
}, (data) => {
  data.sender.setNameTag(data.args.join(" "))
  data.sender.sendMessage(`Updated your nickname to: ${data.args.join(" ")}`)
})
