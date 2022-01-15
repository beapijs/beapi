import type { SocketManager } from '../SocketManager.js'
import { commands } from '../../command/CommandManager.js'
import { players } from '../../player/PlayerManager.js'

export class ExecuteCommand {
  private readonly _socket: SocketManager
  public requestName = 'ExecuteCommand'
  public parameters = 'return'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'ExecuteCommand') return
      if (!packet.data.command)
        return this._socket.sendMessage({
          berp: {
            event: 'ExecuteCommand',
            message: 'You must include a command to execute.',
            requestId: packet.requestId,
          },
        })
      if (!packet.player)
        return this._socket.sendMessage({
          berp: {
            event: 'ExecuteCommand',
            message: 'You must include a player to execute the given command.',
            requestId: packet.requestId,
          },
        })
      if (!commands.getCommands().has(String(packet?.data?.command)))
        return this._socket.sendMessage({
          berp: {
            event: 'ExecuteCommand',
            message: `The command ${packet.data.command} does not exist.`,
            requestId: packet.requestId,
          },
        })
      const sender = players.getPlayerByName(String(packet?.player))
      if (!sender) return
      const command = commands.getCommands().get(String(packet?.data?.command))
      try {
        command?.execute({
          sender: sender,
          args: packet.data.args,
        })
      } catch (err) {
        if (!err) return
        console.warn(err)

        return this._socket.sendMessage({
          berp: {
            event: 'ExecuteCommand',
            message: `An error occurred, ${err}`,
            requestId: packet.requestId,
          },
        })
      }

      return this._socket.sendMessage({
        berp: {
          event: 'ExecuteCommand',
          message: 'Executing Command...',
          requestId: packet.requestId,
        },
      })
    })
  }
}
