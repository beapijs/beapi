import { SocketManager } from '../SocketManager.js'
import { entities } from '../../entity/EntityManager.js'

export class EntityRequest {
  private _socket: SocketManager
  public requestName = 'EntityRequest'
  public parameters = "entity: Number; returns entity: {id: String, runtimeId: Number, nameTag: String, location: {x: Number, y: Number, z: Number}}"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "EntityRequest") return
      if (!entities.getEntityList().has(packet.entity)) return this._socket.sendMessage({
        berp: {
          event: "EntityRequest",
          message: "Entity Not Found!",
          requestId: packet.requestId,
        },
      })
      const entity = entities.getEntityByRuntimeId(packet.entity)
    
      return this._socket.sendMessage({
        berp: {
          event: "EntityRequest",
          message: "Entity Found!",
          entity: {
            id: entity.getId(),
            runtimeId: entity.getRuntimeId(),
            nameTag: entity.getVanilla().nameTag,
            location: {
              x: entity.getVanilla().location.x,
              y: entity.getVanilla().location.y,
              z: entity.getVanilla().location.z,
            },
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
