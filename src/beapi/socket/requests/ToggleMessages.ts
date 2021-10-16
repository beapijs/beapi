import { events } from '../../events/EventManager.js'
import { SocketManager } from '../SocketManager.js'

export class ToggleMessages {
  private _socket: SocketManager
  public requestName = 'ToggleMessages'
  public parameters = "data: Boolean"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', async (packet) => {
      if (packet.event != "ToggleMessages") return
      events.getEvents().get("PlayerMessage").alwaysCancel = packet.data

      return this._socket.sendMessage({
        berp: {
          event: "ToggleMessages",
          message: `Command handler toggled to ${packet.data}`,
          requestId: packet.requestId,
        },
      })
    })
  }
}
