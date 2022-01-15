import { events } from '../../events/EventManager.js'
import type { SocketManager } from '../SocketManager.js'

export class ToggleMessages {
  private readonly _socket: SocketManager
  public requestName = 'ToggleMessages'
  public parameters = 'data: Boolean'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'ToggleMessages') return
      events.getEvents().get('PlayerMessage').alwaysCancel = packet.data

      return this._socket.sendMessage({
        berp: {
          event: 'ToggleMessages',
          message: `Command handler toggled to ${packet.data}`,
          requestId: packet.requestId,
        },
      })
    })
  }
}
