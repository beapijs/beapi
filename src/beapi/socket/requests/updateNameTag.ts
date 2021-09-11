import { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'

export class UpdateNameTag {
  private _socket: SocketManager
  public requestName = 'UpdateNameTag'

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "UpdateNameTag") return
      if (!players.getPlayerList().has(packet.player)) return this._socket.sendMessage({
        berp: {
          event: "UpdateNameTag",
          message: "Player Not Found!",
          requestId: '',
        },
      })
      const player = players.getPlayerByName(packet.player)
      player.setNameTag(packet.message)
    
      return this._socket.sendMessage({
        berp: {
          event: "UpdateNameTag",
          message: `Updated nameTag for ${packet.player} to ${player.getNameTag()}`,
          requestId: packet.requestId,
        },
      })
    })
  }
}
