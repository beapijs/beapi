import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'
import { Player } from '../../player/Player.js'

export class ItemUse {
  private _socket: SocketManager
  public requestName = 'ItemUse'
  public parameters = "returns player: String, data: {item: {id: String, amount: Number, data: Number}}"

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on("ItemUse", (data) => {
      const player = data.source as Player
      this._socket.sendMessage({
        berp: {
          event: this.requestName,
          player: player.getName(),
          data: {
            item: {
              id: data.item.id,
              amount: data.item.amount,
              data: data.item.data, 
            },
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
