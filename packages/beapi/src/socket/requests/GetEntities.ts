import type { SocketManager } from '../SocketManager.js'
import { entities } from '../../entity/EntityManager.js'

export class GetEntities {
  private readonly _socket: SocketManager
  public requestName = 'GetEntities'
  public parameters = 'returns data: {id: String, runtimeId: Number, nameTag: String}[]'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event !== 'GetEntities') return
      const data = []
      for (const [, entity] of entities.getEntityList()) {
        data.push({
          id: entity.getId(),
          runtimeId: entity.getRuntimeId(),
          nameTag: entity.getVanilla().nameTag,
        })
      }

      return this._socket.sendMessage({
        berp: {
          event: 'GetEntities',
          message: 'Sending all cached entities.',
          data: data,
          requestId: packet.requestId,
        },
      })
    })
  }
}
