import type { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'

export class EntityDestroyed {
  private readonly _socket: SocketManager
  public requestName = 'EntityDestroyed'
  public parameters = 'returns entity: {id: String, runtimeId: Number, nameTag: String}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    events.on('EntityDestroyed', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'EntityDestroyed',
          entity: {
            id: data.getId(),
            runtimeId: data.getRuntimeId(),
            nameTag: data.getNameTag(),
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
