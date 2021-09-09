import { World } from 'Minecraft'
import { executeCommand } from '../../command/executeCommand.js'
import { playerManager } from '../../player/playerManager.js'

class chat {
  constructor(events) {
    this.eventName = 'chat'
    this.events = events
    World.events.beforeChat.subscribe((data) => {
      if (playerManager.getPlayerByName(data.sender.name).hasTag('berpUser')) {
        data.canceled = true
      } else if (data.message.startsWith(events.cmdPrefix) && events.cmdEnabled == true) {
        data.canceled = true
        let sender = data.sender.name
        if (sender == undefined) sender = data.sender.nameTag
        this.events.emit('CommandExecuted', {
          sender: playerManager.getPlayerByName(sender),
          command: data.message,
        })
      } else {
        if (this.events.cancelChat) data.canceled = true
        let sender = data.sender.name
        if (sender == undefined) sender = data.sender.nameTag
        this.events.emit('PlayerMessage', {
          sender: playerManager.getPlayerByName(sender),
          message: data.message,
        })
      }
    })
  }
}

export {
  chat,
}
