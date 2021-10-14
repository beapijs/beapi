import {
  commands,
} from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "score",
  description: "Score test",
}, (data) => {
  const score = data.sender.getScore("money")
  data.sender.sendMessage(`Your score: ${score}`)
})
