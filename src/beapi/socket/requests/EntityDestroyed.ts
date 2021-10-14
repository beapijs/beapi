import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { newRequestId } from '../requestId.js'

export class EntityDestroyed {
  private _socket: SocketManager
  public requestName = 'EntityDestroyed'
  public parameters = "returns entity: {id: String, runtimeId: Number, nameTag: String, location: {x: Number, y: Number, z: Number}}"

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on('EntityDestroyed', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "EntityDestroyed",
          entity: {
            id: data.getId(),
            runtimeId: data.getRuntimeId(),
            nameTag: data.getVanilla().nameTag,
            location: {
              x: data.getVanilla().location.x,
              y: data.getVanilla().location.y,
              z: data.getVanilla().location.z,
            },
          },
          requestId: `${newRequestId()}`,
        },
      })
    })
  }
}
