import { SocketManager } from '../SocketManager.js'
import { setInterval } from '../../timers/interval.js'
import { events } from '../../events/EventManager.js'
import { newRequestId } from '../requestId.js'

export class Heartbeat {
  private _socket: SocketManager
  public requestName = 'Heartbeat'
  public parameters = "returns data: {tick: Number}"

  constructor(socket: SocketManager) {
    this._socket = socket
    setInterval(() => {
      if (this._socket.enabled == false) return
      this._socket.sendMessage({
        berp: {
          event: "Heartbeat",
          data: {
            tick: events.getEvents().get("tick")
              .getTicks(),
          },
          requestId: `${newRequestId()}`,
        },
      })
    }, 80)
  }
}
