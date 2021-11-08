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
      const player = players.getPlayerByName(packet.player)
      const vanilla = player.getVanilla()
    
      return this._socket.sendMessage({
        berp: {
          event: "PlayerRequest",
          message: `Found data for ${packet.player}`,
          player: {
            name: vanilla.name,
            nameTag: vanilla.nameTag.replace(/\n/g, "*n"),
            health: {
              current: player.getHealth().current,
              max: player.getHealth().max,
            },
            location: {
              x: vanilla.location.x,
              y: vanilla.location.y,
              z: vanilla.location.z,
            },
            isSneaking: vanilla.isSneaking,
            id: vanilla.id,
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
