import {
  Commands,
  World,
} from 'mojang-minecraft'
import { SocketManager } from '../SocketManager.js'

export class CommandRequest {
  private _socket: SocketManager
  public requestName = 'CommandRequest'

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', async (packet) => {
      if (packet.event != "CommandRequest") return
      try {
        const command = Commands.run(packet.command, World.getDimension('overworld'))
        
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
