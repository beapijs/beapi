import type { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../../utils/uuidv4.js'

export class UpdateNameTag {
  private readonly _socket: SocketManager
  public requestName = 'UpdateNameTag'
  public parameters = 'player: String, message: String'

  public constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet: Record<string, any>) => {
      if (packet.event !== 'UpdateNameTag') return
      if (!players.getPlayerList().has(String(packet.player)))
        return this._socket.sendMessage({
          berp: {
            event: 'UpdateNameTag',
            message: 'Player Not Found!',
            requestId: packet.requestId,
          },
        })
      const player = players.getPlayerByName(String(packet.player))
      player?.setNameTag(String(packet.message?.replace(/\*n/g, '\n')))

      return this._socket.sendMessage({
        berp: {
          event: 'UpdateNameTag',
          message: `Updated nameTag for ${packet.player} to ${player?.getNameTag()}`,
          requestId: packet.requestId,
        },
      })
    })
    events.on('NameTagChanged', (data) => {
      this._socket.sendMessage({
        berp: {
          event: 'NameTagChanged',
          player: data.player.getName(),
          data: {
            old: data.old,
            new: data.new,
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
