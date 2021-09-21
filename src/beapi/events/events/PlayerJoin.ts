import { World } from 'mojang-minecraft'
import { EventManager } from '../EventManager.js'
import { Player } from '../../player/Player.js'
import { executeCommand } from '../../command/executeCommand.js'

export class PlayerJoin {
  private _events: EventManager
  private _oldPlayers: string[] = []
  public eventName = 'PlayerJoin'

  constructor (events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      const currentPlayers: string[] = executeCommand('/list').statusMessage.split('\n')[1].split(', ')
      const playersJoined = currentPlayers.filter(current => !this._oldPlayers.some(old => current == old))
      for (const player of playersJoined) {
        const players = World.getPlayers()
        players.forEach((x) => {
          if (x.name != player) return
         
          return this._events.emit('PlayerJoin', new Player(x))
        })
      }
      this._oldPlayers = currentPlayers
    })
  }
}
