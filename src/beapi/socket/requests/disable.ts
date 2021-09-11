import { SocketManager } from '../SocketManager.js'

export class DisableRequest {
  private _socket: SocketManager
  public requestName = 'DisableRequest'

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on("Message", (packet) => {
      if (packet.event != "DisableRequest" || this._socket.enabled == false) return
      this._socket.enabled = false
      this._socket.sendMessage({
        berp: {
          event: "SocketDisabled",
          requestId: packet.requestId,
        },
      })
    })
  }
}
