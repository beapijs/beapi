import { commands } from '../../index.js'
import type { SocketManager } from '../SocketManager.js'

export class ToggleCommands {
  private readonly _socket: SocketManager
  public requestName = 'ToggleCommands'
  public parameters = 'data: Boolean'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'ToggleCommands') return
      commands.enabled = packet.data

      return this._socket.sendMessage({
        berp: {
          event: 'ToggleCommands',
          message: `Command handler toggled to ${packet.data}`,
          requestId: packet.requestId,
        },
      })
    })
  }
}
