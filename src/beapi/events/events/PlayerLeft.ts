import { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { executeCommand } from '../../command/executeCommand.js'

export class PlayerLeft {
  private _events: EventManager
  private _oldPlayers: string[] = []
  public eventName = 'PlayerLeft'

  constructor (events: EventManager) {
    this._events = events
    this._events.on('tick', () => {
      const currentPlayers: string[] = executeCommand('/list').statusMessage.split('\n')[1].split(', ')
      const playerLeft = this._oldPlayers.filter(old => !currentPlayers.some(current => old == current))
      for (const player of playerLeft) {
        if (player == '') continue
        this._events.emit('PlayerLeft', players.getPlayerByName(player))
      }
      this._oldPlayers = currentPlayers
    })
  }
}
