import type { SocketManager } from '../SocketManager.js'
import { entities } from '../../entity/EntityManager.js'

export class UpdateEntity {
  private readonly _socket: SocketManager
  public requestName = 'UpdateEntity'
  public parameters =
    'entity: Number, data?: {kill?: Boolean, command?: String, triggerEvent?: String}; returns data?: {statusMessage?: String, err?: Boolean}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event !== 'UpdateEntity') return
      if (!entities.getEntityList().has(Number(packet.entity)))
        return this._socket.sendMessage({
          berp: {
            event: 'UpdateEntity',
            message: `No entity found with the runtimeId of ${packet.entity}`,
            requestId: packet.requestId,
          },
        })
      const entity = entities.getEntityByRuntimeId(Number(packet.entity))
      if (packet.data.nameTag) {
        entity?.setNameTag(String(packet.data?.nameTag))
      }
      if (packet.data.kill === true) {
        entity?.destroy()
      }
      let command
      if (packet.data.command) {
        command = entity?.executeCommand(String(packet.data?.command))
      }
      if (packet.data.triggerEvent) {
        entity?.getVanilla().triggerEvent(String(packet.data?.triggerEvent))
      }

      return this._socket.sendMessage({
        berp: {
          event: 'UpdateEntity',
          message: `Updated data for entity with runtimeId as ${packet.entity}`,
          data: {
            statusMessage: command?.statusMessage,
            err: command?.err,
          },
          requestId: packet.requestId,
        },
      })
    })
  }
}
