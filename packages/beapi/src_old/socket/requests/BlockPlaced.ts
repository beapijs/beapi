import type { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../../utils/uuidv4.js'

export class BlockPlaced {
  private readonly _socket: SocketManager
  public requestName = 'BlockPlaced'
  public parameters = 'player: String, data: {id: String, dimension: String, pos: {x: Number, y: Number, z: Number}}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    events.on('BlockPlaced', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'BlockPlaced',
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
