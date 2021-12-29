import type { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'

export class EntityCreate {
  private readonly _socket: SocketManager
  public requestName = 'EntityCreate'
  public parameters =
    'returns entity: {id: String, runtimeId: Number, nameTag: String, location: {dimension: String, x: Number, y: Number, z: Number}}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    events.on('EntityCreate', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'EntityCreate',
          entity: {
            id: data.getId(),
            runtimeId: data.getRuntimeId(),
            nameTag: data.getVanilla().nameTag,
            location: {
              dimension: data.getDimensionName(),
              x: data.getVanilla().location.x,
              y: data.getVanilla().location.y,
              z: data.getVanilla().location.z,
            },
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
