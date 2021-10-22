import { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'

export class TagsRequest {
  private _socket: SocketManager
  public requestName = 'TagsRequest'
  public parameters = "player?: String, entity?: Number; returns "

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "TagsRequest") return
      if (!players.getPlayerList().has(packet.player)) return this._socket.sendMessage({
        berp: {
          event: "TagsRequest",
          message: "Player Not Found!",
          requestId: packet.requestId,
        },
      })
      const player = players.getPlayerByName(packet.player)
    
      return this._socket.sendMessage({
        berp: {
          event: "TagsRequest",
          message: "Returns tags.",
          data: player.getTags(),
          requestId: packet.requestId,
        },
      })
    })
  }
}
