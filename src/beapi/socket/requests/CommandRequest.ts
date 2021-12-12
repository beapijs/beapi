import {
  world,
} from 'mojang-minecraft'
import { SocketManager } from '../SocketManager.js'

export class CommandRequest {
  private _socket: SocketManager
  public requestName = 'CommandRequest'
  public parameters = "command: String, dimension: String"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', async (packet) => {
      if (packet.event != "CommandRequest") return
      let dimension = "overworld"
      if (packet.dimension) dimension = packet.dimension
      try {
        const command = world.getDimension(dimension as any).runCommand(packet.command)
        
        return this._socket.sendMessage({
          berp: {
            event: "CommandRequest",
            message: command.statusMessage,
            data: command,
            requestId: packet.requestId,
          },
        })
      } catch (err) {
        return this._socket.sendMessage({
          berp: {
            event: "CommandRequest",
            message: err.statusMessage,
            requestId: packet.requestId,
          },
        })
      }
    })
  }
}
