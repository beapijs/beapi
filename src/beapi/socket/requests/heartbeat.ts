import { SocketManager } from '../SocketManager.js'
import { setInterval } from '../../timers/interval.js'
import { newRequestId } from '../requestId.js'

export class Heartbeat {
  private _socket: SocketManager
  public requestName = 'Heartbeat'

  constructor(socket: SocketManager) {
    this._socket = socket
    setInterval(() => {
      if (this._socket.enabled == false) return
      this._socket.sendMessage({
        berp: {
          event: "Heartbeat",
          requestId: `${newRequestId()}`,
        },
      })
    }, 80)
  }
}
