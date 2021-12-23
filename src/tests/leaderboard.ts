import {
  events,
  entities,
  players,
} from '../beapi/BeAPI.js'

// Custom Floating Leaderboards
//
// Tag Layout: "lb:<objective>:<objectiveSymbol>:<symbolColor>:<playerColor>:<displayText>"
// tag @e[type="armor_stand"] add "lb:money:$:a:9:Player_Money"
// 
// In the displayText tag, any underscores will be replaced with spaces.
//

events.on("tick", () => {
  for (const [, e] of entities.getEntityList()) {
    let objective: string
    let symbol: string
    let symbolColor: string
    let playerColor: string
    let displayName: string

    for (const tag of e.getTags()) {
      if (!tag.startsWith('lb:')) continue
      const split = tag.replace('lb:', '').split(":")
      objective = split[0]
      symbol = split[1]
      symbolColor = split[2]
      playerColor = split[3]
      displayName = split[4].replace(/_/g, " ")
    }
    if (!objective) continue
    const text = [
      `§l${displayName}§r`,
    ]
    for (const [, p] of players.getPlayerList()) {
      text.push(`§${playerColor}${p.getName()}§r §7-§r §${symbolColor}${symbol}${p.getScore(objective)}§r`)
    }
    e.setNameTag(text.join("\n"))
  }
})
