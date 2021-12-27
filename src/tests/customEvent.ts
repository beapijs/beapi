import {
  events,
  commands,
  players,
} from '../beapi/BeAPI.js'

events.on("tick", () => {
  for (const [, player] of players.getPlayerList()) {
    if (!player.hasTag("exe:help")) continue
    
    const command = commands.getCommands().get("help")
    command.execute({
      sender: player,
      args: [],
    })
    player.removeTag("exe:help")
  }
})
