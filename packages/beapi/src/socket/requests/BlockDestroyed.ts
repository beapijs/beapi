import type { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'

export class BlockDestroyed {
  private readonly _socket: SocketManager
  public requestName = 'BlockDestroyed'
  public parameters = 'player: String, data: {id: String, dimension: String, pos: {x: Number, y: Number, z: Number}}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    events.on('BlockDestroyed', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'BlockDestroyed',
          player: data.player.getName(),
          data: {
            id: data.block.id,
            dimension: data.player.getDimensionName(),
            pos: {
              x: data.block.location.x,
              y: data.block.location.y,
              z: data.block.location.z,
            },
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
