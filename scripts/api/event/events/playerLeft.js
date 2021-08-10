import { playerManager } from '../../player/playerManager.js'

class playerLeft {
  constructor(events) {
    this.eventName = 'playerLeft'
    this.events = events
    this.oldPlayers = []
    this.events.on('tick', () => {
      const currentPlayers = playerManager.getPlayerNames()
      const playerLeft = this.oldPlayers.filter(old => !currentPlayers.some(current => old == current))
      playerLeft.forEach((player) => {
        if (player == '') return
        this.events.emit('PlayerLeft', playerManager.getPlayerByName(player))
      })
      this.oldPlayers = currentPlayers
    })
  }
}

export {
  playerLeft,
}
