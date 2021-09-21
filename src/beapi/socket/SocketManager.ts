import {
  Commands,
  World,
} from 'mojang-minecraft'
import { JsonRequest } from '../../types/BeAPI.i'
import { emitter } from '../events/emitter/emitter.js'
import { events } from '../events/EventManager.js'
import { world } from '../world/WorldManager.js'
import { defaultRequests } from './requests/index.js'

export class SocketManager extends emitter {
  private _requests = new Map<string, any>()
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
  }
  private _loadRequests(): void {
    for (const request of defaultRequests) {
      const Request = new request(this)
      this._requests.set(Request.requestName, Request)
    }
  }
  public sendMessage(message: JsonRequest): void {
    try {
      return Commands.run(`tellraw @a[tag="berpUser"] {"rawtext":[{"text":"${JSON.stringify(message).replace(/"/g, '\\"')
        .replace(/\\n/g, '\\n')}"}]}`, World.getDimension('overworld'))
    } catch (err) {
      if (this.enabled == false) return
      world.sendMessage('Socket Disabled...')
      this.enabled = false
    }
  }
}

const socket = new SocketManager()

export {
  socket,
}
