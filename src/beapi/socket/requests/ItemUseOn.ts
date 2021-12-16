import { SocketManager } from '../SocketManager.js'
import { events } from '../../events/EventManager.js'
import { uuidv4 } from '../uuidv4.js'
import { Player } from '../../player/Player.js'

export class ItemUseOn {
  private _socket: SocketManager
  public requestName = 'ItemUseOn'
  public parameters = "returns player: String, data: {item: {id: String, amount: Number, data: Number}, block: {id: String, dimension: String, pos:{x: Number, y: Number, z: Number}}}"

  constructor(socket: SocketManager) {
    this._socket = socket
    events.on("ItemUseOn", (data) => {
      const player = data.source as Player
      let itemId = data.item.id
      if (itemId === "") itemId = "minecraft:air"
      this._socket.sendMessage({
        berp: {
          event: this.requestName,
          player: player.getName(),
          data: {
            item: {
              id: itemId,
              amount: data.item.amount,
              data: data.item.data, 
            },
            block: {
              id: data.block.id || "minecraft:air",
              dimension: player.getDimensionName(),
              pos: {
                x: data.block.location.x,
                y: data.block.location.y,
                z: data.block.location.z,
              },
            },
          },
          requestId: uuidv4(),
        },
      })
    })
  }
}
