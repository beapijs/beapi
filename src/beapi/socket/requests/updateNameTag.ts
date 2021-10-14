import { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'
import { events } from '../../events/EventManager.js'
import { newRequestId } from '../requestId.js'

export class UpdateNameTag {
  private _socket: SocketManager
  public requestName = 'UpdateNameTag'
  public parameters = "player: String, message: String"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "UpdateNameTag") return
      if (!players.getPlayerList().has(packet.player)) return this._socket.sendMessage({
        berp: {
          event: "UpdateNameTag",
          message: "Player Not Found!",
          requestId: packet.requestId,
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
    events.on('NameTagChanged', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "NameTagChanged",
          player: data.player.getName(),
          data: {
            old: data.old,
            new: data.new,
          },
          requestId: `${newRequestId()}`,
        },
      })
    })
  }
}
