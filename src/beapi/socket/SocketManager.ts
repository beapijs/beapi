import {
  world as World,
} from 'mojang-minecraft'
import { JsonRequest } from '../../types/BeAPI.i'
import { players } from '../player/PlayerManager.js'
import { executeCommand } from '../command/executeCommand.js'
import { emitter } from '../events/emitter/emitter.js'
import { events } from '../events/EventManager.js'
import { defaultRequests } from './requests/index.js'
import { world } from '../world/WorldManager.js'

export class SocketManager extends emitter {
  private _requests = new Map<string, any>()
  public log = false
  public enabled = false

  constructor() {
    super()
    this._listener()
    this._loadRequests()
  }
  private _listener(): void {
    events.on('RawSocketMessage', (data) => {
      if (!data.message.startsWith('{"berp":')) return
      const parsedMessage = JSON.parse(data.message).berp
      this.emit("Message", parsedMessage)
    })
    events.on("tick", (tick) => {
      if (tick % 25 != 0) return
      let found = 0
      for (const [, player] of players.getPlayerList()) {
        if (!player.hasTag("berpUser")) continue

        found++
      }

      if (found != 0 || this.enabled == false) return
      this.enabled = false
      world.sendMessage('§cSocket Disabled...')
    })
  }
  private _loadRequests(): void {
    for (const request of defaultRequests) {
      const Request = new request(this)
      this._requests.set(Request.requestName, Request)
    }
  }
  public sendMessage(message: JsonRequest): void {
    executeCommand(`execute @a ~ ~ ~ tellraw @s[tag="logSM"] {"rawtext":[{"text":"${JSON.stringify(message).replace(/"/g, '\\"')
      .replace(/\\n/g, '\\n')}"}]}`)
    try {
      return World.getDimension('overworld').runCommand(`execute @a ~ ~ ~ tellraw @s[tag="berpUser"] {"rawtext":[{"text":"${JSON.stringify(message).replace(/"/g, '\\"')
        .replace(/\\n/g, '\\n')}"}]}`)
    } catch (err) {}

    if (this.log !== true || message.berp.event === "EnableSocket" || message.berp.event === "Heartbeat") return
    console.warn(JSON.stringify(message))
  }
  public getSocketRequests(): Map<string, any> { return this._requests }
}

const socket = new SocketManager()

export {
  socket,
}
