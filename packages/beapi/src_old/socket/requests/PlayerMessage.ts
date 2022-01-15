import type { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../../utils/uuidv4.js'
import { world } from 'mojang-minecraft'

export class PlayerMessage {
  private readonly _socket: SocketManager
  public requestName = 'PlayerMessage'
  public parameters = 'returns sender: String, player: {name: String, nameTag: String}, message: String'

  public constructor(socket: SocketManager) {
    this._socket = socket
    world.events.beforeChat.subscribe((data) => {
      this._socket.sendMessage({
        berp: {
          event: 'PlayerMessage',
          sender: data.sender.name || data.sender.nameTag,
          player: {
            name: data.sender.name,
            nameTag: data.sender.nameTag.replace(/\n/g, '*n'),
          },
          message: data.message.replace(/\\/g, '/'),
          requestId: uuidv4(),
        },
      })
    })
    events.on('ChatCommand', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'ChatCommand',
          sender: data.sender.getName() || data.sender.getNameTag().replace(/\n/g, '*n'),
          player: {
            name: data.sender.getName(),
            nameTag: data.sender.getNameTag(),
          },
          command: data.command,
          requestId: uuidv4(),
        },
      })
    })
  }
}
