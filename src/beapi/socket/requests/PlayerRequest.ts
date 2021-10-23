import { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'

export class PlayerRequest {
  private _socket: SocketManager
  public requestName = 'PlayerRequest'
  public parameters = "player: String; returns player: {name: String, nameTag: String, location: {x: Number, y: Number, z: Number}}, isSneaking: Boolean, id: String"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "PlayerRequest") return
      if (!players.getPlayerList().has(packet.player)) return this._socket.sendMessage({
        berp: {
          event: "PlayerRequest",
          message: "Player Not Found!",
          requestId: packet.requestId,
        },
      })
      const player = players.getPlayerByName(packet.player).getVanilla()
    
      return this._socket.sendMessage({
        berp: {
          event: "PlayerRequest",
          message: `Found data for ${packet.player}`,
          player: {
            name: player.name,
            nameTag: player.nameTag.replace(/\n/g, "*n"),
            location: {
              x: player.location.x,
              y: player.location.y,
              z: player.location.z,
            },
            isSneaking: player.isSneaking,
            id: player.id,
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
