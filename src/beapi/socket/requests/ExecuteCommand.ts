import { SocketManager } from '../SocketManager.js'
import { commands } from '../../command/CommandManager.js'
import { players } from '../../player/PlayerManager.js'

export class ExecuteCommand {
  private _socket: SocketManager
  public requestName = 'ExecuteCommand'
  public parameters = "return"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "ExecuteCommand") return
      if (!packet.data.command) return this._socket.sendMessage({
        berp: {
          event: "ExecuteCommand",
          message: "You must include a command to execute.",
          requestId: packet.requestId,
        },
      })
      if (!packet.player) return this._socket.sendMessage({
        berp: {
          event: "ExecuteCommand",
          message: "You must include a player to execute the given command.",
          requestId: packet.requestId,
        },
      })
      if (!commands.getCommands().has(packet.data.command)) return this._socket.sendMessage({
        berp: {
          event: "ExecuteCommand",
          message: `The command ${packet.data.command} does not exist.`,
          requestId: packet.requestId,
        },
      })
      const sender = players.getPlayerByName(packet.player)
      const command = commands.getCommands().get(packet.data.command)
      try {
        command.execute({
          sender: sender,
          args: packet.data.args,
        })
      } catch (err) {
        if (!err) return
        console.warn(err)

        return this._socket.sendMessage({
          berp: {
            event: "ExecuteCommand",
            message: `An error occurred, ${err}`,
            requestId: packet.requestId,
          },
        })
      }

      return this._socket.sendMessage({
        berp: {
          event: "ExecuteCommand",
          message: "Executing Command...",
          requestId: packet.requestId,
        },
      })
    })
  }
}
