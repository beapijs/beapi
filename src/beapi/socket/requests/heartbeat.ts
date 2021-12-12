import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'

export class Heartbeat {
  private _socket: SocketManager
  public requestName = 'Heartbeat'
  public parameters = "returns data: {tick: Number}"

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on("tick", (tick) => {
      if (tick % 80 != 0) return
      if (this._socket.enabled == false) return
      this._socket.sendMessage({
        berp: {
          event: "Heartbeat",
          data: {
            tick: events.getEvents().get("tick")
              .getTicks(),
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
