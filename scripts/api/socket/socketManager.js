import { emitter } from '../emitter/emitter.js'
import { World } from 'Minecraft'
import { executeCommand } from '../command/executeCommand.js'
import { playerManager } from '../player/playerManager.js'


// Still in Development
class socketManager extends emitter {
  constructor() {
    super()
    this._listener()
  }
  /**
   * @private
   */
  _listener() {
    World.events.beforeChat.subscribe((data) => {
      if (!playerManager.getPlayerByName(data.sender.name).hasTag('berpUser')) return
      data.canceled = true
      if (!data.message.startsWith('{"berp":')) return
      const parsedMessage = JSON.parse(data.message)
      this.emit("Message", parsedMessage)
    })
  }
  sendMessage(message) {
    executeCommand(`say test`)
  }
}

/**
 * @type {import('./socket.d').socketManager}
 */
const socket = new socketManager()

export {
  socket,
}