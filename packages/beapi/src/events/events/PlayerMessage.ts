import { world as World } from 'mojang-minecraft'
import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { commands } from '../../command/CommandManager.js'
import { world } from '../../world/WorldManager.js'
import type { Player } from '../../player/Player.js'
import { executeCommand } from '../../command/executeCommand.js'

export class PlayerMessage {
  private readonly _events: EventManager
  private _cancelNextMessage = false
  public alwaysCancel = false
  public eventName = 'PlayerMessage'

  public constructor(events: EventManager) {
    this._events = events
    World.events.beforeChat.subscribe((data) => {
      executeCommand(
        `execute @a ~ ~ ~ tellraw @a[tag="log"] {"rawtext":[{"text":"Player Message: ${data.sender.name}|${
          data.sender.nameTag
        } : ${data.message.replace(/\\/g, '/')}"}]}`,
      )
      data.cancel = true
      const player = players.getPlayerByNameTag(data.sender.nameTag)

      if (!player) return

      if (player.hasTag('berpUser'))
        return this._events.emit('RawSocketMessage', {
          sender: player,
          message: data.message,
        })

      if (data.message.startsWith(commands.getPrefix()) && commands.enabled)
        return this._events.emit('ChatCommand', {
          sender: player,
          command: data.message,
        })

      this._events.emit('PlayerMessage', {
        sender: player,
        message: data.message,
        cancelEvent: this._processCanceledMessage.bind,
      })

      this._processMessage(player, data.message)
    })
  }

  private _processCanceledMessage(cancel = true): void {
    if (!cancel) return
    this._cancelNextMessage = true
  }

  private _processMessage(sender: Player, message: string): void {
    if (this._cancelNextMessage || this.alwaysCancel) return
    this._cancelNextMessage = false
    world.sendMessage(`<${sender.getName()}> ${message.replace(/\\/g, '/')}`)
  }
}
