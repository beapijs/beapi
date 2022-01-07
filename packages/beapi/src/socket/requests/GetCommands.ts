import type { SocketManager } from '../SocketManager.js'
import { commands } from '../../command/CommandManager.js'

export class GetCommands {
  private readonly _socket: SocketManager
  public requestName = 'GetCommands'
  public parameters =
    'returns {message: String, data: {command: String, options: {showInList: Boolean, description: String, aliases: String[], permissionTags: String[]}}[]}'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'GetCommands') return
      const cmds = []
      for (const [, c] of commands.getCommands()) {
        cmds.push({
          command: c.options.command,
          options: {
            showInList: c.showInList,
            description: c.options.description,
            aliases: c.options.aliases,
            permissionTags: c.options.permissionTags,
          },
          source: 'BeAPI',
        })
      }

      return this._socket.sendMessage({
        berp: {
          event: 'GetCommands',
          message: 'Sending all registered commands.',
          data: cmds,
          requestId: packet.requestId,
        },
      })
    })
  }
}
