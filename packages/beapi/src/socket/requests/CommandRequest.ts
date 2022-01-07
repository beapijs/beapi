import { world } from 'mojang-minecraft'
import type { SocketManager } from '../SocketManager.js'

export class CommandRequest {
  private readonly _socket: SocketManager
  public requestName = 'CommandRequest'
  public parameters = 'command: String, dimension: String'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'CommandRequest') return
      let dimension: 'overworld' | 'nether' | 'the end' = 'overworld'
      if (packet.dimension) dimension = packet.dimension
      try {
        const command = world.getDimension(dimension).runCommand(String(packet?.command))

        return this._socket.sendMessage({
          berp: {
            event: 'CommandRequest',
            message: command.statusMessage,
            data: command,
            requestId: packet.requestId,
          },
        })
      } catch (err: any) {
        return this._socket.sendMessage({
          berp: {
            event: 'CommandRequest',
            message: err.statusMessage,
            requestId: packet.requestId,
          },
        })
      }
    })
  }
}
