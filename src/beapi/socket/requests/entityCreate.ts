import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { newRequestId } from '../requestId.js'

export class EntityCreate {
  private _socket: SocketManager
  public requestName = 'EntityCreate'

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on('EntityCreate', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "EntityCreate",
          entity: {
            id: data.getId(),
            runtimeId: data.getRuntimeId(),
            nameTag: data.getNameTag(),
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
