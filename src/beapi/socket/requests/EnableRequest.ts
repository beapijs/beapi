import { SocketManager } from '../SocketManager.js'
import { setInterval } from '../../timers/interval.js'
import { newRequestId } from '../requestId.js'
import {
  build,
  mcbe,
  protocol,
  version,
} from '../../version.js'

export class EnableRequest {
  private _socket: SocketManager
  public requestName = 'EnableRequest'
  public parameters = "returns data: {api: String, version: String, mcbe: String, protcol: Number, build: String}"

  constructor(socket: SocketManager) {
    this._socket = socket
    setInterval(() => {
      if (this._socket.enabled == true) return
      this._socket.sendMessage({
        berp: {
          event: "EnableSocket",
          data: {
            api: "BeAPI",
            version: version,
            mcbe: mcbe,
            protocol: protocol,
            build: build,
          },
          requestId: `${newRequestId()}`,
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
