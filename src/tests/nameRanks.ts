import {
  events,
  players,
} from '../beapi/BeAPI.js'

events.on("tick", () => {
  for (const [, player] of players.getPlayerList()) {
    let rank: string
    for (const tag of player.getTags()) {
      if (!tag.startsWith('rank:')) continue
      rank = tag.replace('rank:', '')
    }
    if (rank == undefined) rank = "§eMember"
    player.setNameTag(`§l§8[§r${rank}§l§8]§r\n§7${player.getName()}§r`)
  }
})
