import { commands } from '../../BeAPI.js'
import { SocketManager } from '../SocketManager.js'

export class ToggleCommands {
  private _socket: SocketManager
  public requestName = 'ToggleCommands'
  public parameters = "data: Boolean"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', async (packet) => {
      if (packet.event != "ToggleCommands") return
      commands.enabled = packet.data

      return this._socket.sendMessage({
        berp: {
          event: "ToggleCommands",
          message: `Command handler toggled to ${packet.data}`,
          requestId: packet.requestId,
        },
      })
    })
  }
}
