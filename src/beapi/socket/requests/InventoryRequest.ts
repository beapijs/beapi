import { SocketManager } from '../SocketManager.js'
import { players } from '../../player/PlayerManager.js'

export class InventoryRequest {
  private _socket: SocketManager
  public requestName = 'InventoryRequest'
  public parameters = "player: String; returns data: {slot: Number, id: String, amount: Number, data: Number}[]"

  constructor(socket: SocketManager) {
    this._socket = socket
    this._socket.on('Message', (packet) => {
      if (packet.event != "InventoryRequest") return
      if (!players.getPlayerList().has(packet.player)) return this._socket.sendMessage({
        berp: {
          event: "InventoryRequest",
          message: "Player Not Found!",
          requestId: packet.requestId,
        },
      })
      const player = players.getPlayerByName(packet.player)
      const items = []
      for (let slot = 0; slot != player.getInventory().size; slot++) {
        let item = player.getInventory().getItem(slot)
        if (!item) item = {
          id: "minecraft:air",
          amount: 0,
          data: 0,  
        } as any
        items.push({
          slot: slot,
          id: item.id,
          amount: item.amount,
          data: item.data,
        })
      }
    
      return this._socket.sendMessage({
        berp: {
          event: "InventoryRequest",
          message: `Found data for ${packet.player}`,
          data: items,
          requestId: packet.requestId,
        },
      })
    })
  }
}
