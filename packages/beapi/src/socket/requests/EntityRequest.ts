import type { SocketManager } from '../SocketManager.js'
import { entities } from '../../entity/EntityManager.js'

export class EntityRequest {
  private readonly _socket: SocketManager
  public requestName = 'EntityRequest'
  public parameters =
    'entity: Number; returns entity: {id: String, runtimeId: Number, nameTag: String, location: {dimension: String, x: Number, y: Number, z: Number}}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event !== 'EntityRequest') return
      if (!entities.getEntityList().has(Number(packet?.entity)))
        return this._socket.sendMessage({
          berp: {
            event: 'EntityRequest',
            message: 'Entity Not Found!',
            requestId: packet.requestId,
          },
        })
      const entity = entities.getEntityByRuntimeId(Number(packet?.entity))

      return this._socket.sendMessage({
        berp: {
          event: 'EntityRequest',
          message: 'Entity Found!',
          entity: {
            id: entity?.getId(),
            runtimeId: entity?.getRuntimeId(),
            nameTag: entity?.getVanilla().nameTag,
            health: {
              current: entity?.getHealth().current,
              max: entity?.getHealth().max,
            },
            location: {
              dimension: entity?.getDimensionName(),
              x: entity?.getVanilla().location.x,
              y: entity?.getVanilla().location.y,
              z: entity?.getVanilla().location.z,
            },
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
