import { SocketManager } from '../SocketManager.js'
import { setInterval } from '../../timers/interval.js'

export class EnableRequest {
  private _socket: SocketManager
  public requestName = 'EnableRequest'

  constructor(socket: SocketManager) {
    this._socket = socket
    setInterval(() => {
      if (this._socket.enabled == true) return
      this._socket.sendMessage({
        berp: {
          event: "EnableSocket",
          requestId: '',
        },
      })
    }, 25)
    this._socket.on("Message", (packet) => {
      if (packet.event != "EnableRequest" || this._socket.enabled == true) return
      this._socket.enabled = true
      this._socket.sendMessage({
        berp: {
          event: "SocketEnabled",
          requestId: packet.requestId,
        },
      })
    })
  }
}
