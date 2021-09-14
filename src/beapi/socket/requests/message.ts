import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'

export class PlayerMessage {
  private _socket: SocketManager
  public requestName = 'PlayerMessage'

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on('PlayerMessage', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "PlayerMessage",
          sender: data.sender.getName() || data.sender.getNameTag(),
          player: {
            name: data.sender.getName(),
            nameTag: data.sender.getNameTag(),
          },
          message: data.message,
          requestId: '',
        },
      })
    })
    events.on('ChatCommand', (data) => {
      this._socket.sendMessage({
        berp: {
          event: "ChatCommand",
          sender: data.sender.getName() || data.sender.getNameTag(),
          player: {
            name: data.sender.getName(),
            nameTag: data.sender.getNameTag(),
          },
          command: data.command,
          requestId: '',
        },
      })
    })
  }
}
