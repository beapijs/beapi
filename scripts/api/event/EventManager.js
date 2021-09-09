import { emitter } from '../emitter/emitter.js'
import {
  tick,
  playerJoined,
  playerLeft,
  chat,
} from './events/index.js'

class eventManager extends emitter {
  constructor() {
    super()
    this.events = new Map()
    this.cancelChat = false
    this.cmdPrefix = "-"
    this.cmdEnabled = false
    this.loadEvents()
  }
  /**
   * @private
   */
  loadEvents() {
    const tickEvent = new tick(this)
    this.events.set(tickEvent.eventName, tickEvent)
    const playerJoinedEvent = new playerJoined(this)
    this.events.set(playerJoinedEvent.eventName, playerJoinedEvent)
    const playerLeftEvent = new playerLeft(this)
    this.events.set(playerLeftEvent.eventName, playerLeftEvent)
    const chatEvent = new chat(this)
    this.events.set(chatEvent.eventName, chatEvent)
  }
}

/**
 * @type {import('./events').eventManager}
 */
const events = new eventManager()

export {
  events,
}