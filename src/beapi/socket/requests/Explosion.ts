import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'

export class Explosion {
  private _socket: SocketManager
  public requestName = 'Explosion'
  public parameters = "returns data: {source: String, impactedBlocks: {x: Number, y: Number, z: Number}[]}"

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on('Explosion', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "Explosion",
          data: {
            entity: data.source.id,
            impactedBlocks: data.impactedBlocks,
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
