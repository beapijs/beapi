import { World } from 'Minecraft'
import { playerManager } from '../../player/PlayerManager.js'
import { Player } from '../../player/player.js'

class playerJoined {
  constructor(events) {
    this.eventName = 'playerJoined'
    this.events = events
    this.oldPlayers = []
    this.events.on('tick', () => {
      const currentPlayers = playerManager.getPlayerNames()
      const playersJoined = currentPlayers.filter(current => !this.oldPlayers.some(old => current == old))
      for (const player of playersJoined) {
        const players = World.getPlayers()
        players.forEach((x) => {
          let name = x.name
          if (x.name == undefined) name = x.nameTag
          if (name != player) return
          return this.events.emit('PlayerJoined', new Player(x))
        })
      }
      this.oldPlayers = currentPlayers
    })
  }
}

export {
  playerJoined,
}
