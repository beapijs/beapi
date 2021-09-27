import { SocketManager } from '../SocketManager.js'
import { entities } from '../../entity/EntityManager.js'

export class UpdateEntity {
  private _socket: SocketManager
  public requestName = 'UpdateEntity'

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "UpdateEntity") return
      if (!entities.getEntityList().has(packet.entity)) return this._socket.sendMessage({
        berp: {
          event: "UpdateEntity",
          message: `No entity found with the runtimeId of ${packet.entity}`,
          requestId: packet.requestId,
        },
      })
      const entity = entities.getEntityByRuntimeId(packet.entity)
      if (packet.data.nameTag) {
        entity.setNameTag(packet.data.nameTag)
      }
      if (packet.data.kill == true) {
        entity.destroy()
      }
      let command
      if (packet.data.command) {
        command = entity.executeCommand(packet.data.command)
      }
      if (packet.data.triggerEvent) {
        entity.getVanilla().triggerEvent(packet.data.triggerEvent)
      }

      return this._socket.sendMessage({
        berp: {
          event: "UpdateEntity",
          message: `Updated data for entity with runtimeId as ${packet.entity}`,
          data: {
            statusMessage: command.statusMessage,
            err: command.err,
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
