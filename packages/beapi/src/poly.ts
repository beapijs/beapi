// Imports
import { Client } from './client'
import { Timers } from './polyfill/Timers'

// Create original console warn reference.
const log = console.warn

// Override Default Console Methods
// @ts-expect-error Console expects more methods.
// Gametest only adds warn and error by default we add a few more.
// TODO: Add formatting support for Objects, Array, Etc.
globalThis.console = {
  /**
   * Sends a BeAPI log to the content log in-game.
   * @param {string} message Primary message.
   * @param {string} optionalParams Optional extra fragments.
   */
  log(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §b[LOG]:§r ${message} ${optionalParams.join(' ')}`)
  },
  /**
   * Sends a BeAPI error log to the content log in-game.
   * @param {string} message Primary message.
   * @param {string} optionalParams Optional extra fragments.
   */
  error(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §c[ERROR]:§r ${message} ${optionalParams.join(' ')}`)
  },
  /**
   * Sends a BeAPI warn log to the content log in-game.
   * @param {string} message Primary message.
   * @param {string} optionalParams Optional extra fragments.
   */
  warn(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §g[WARN]:§r ${message} ${optionalParams.join(' ')}`)
  },
  /**
   * Sends a BeAPI info log to the content log in-game.
   * @param {string} message Primary message.
   * @param {string} optionalParams Optional extra fragments.
   */
  info(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §a[INFO]:§r ${message} ${optionalParams.join(' ')}`)
  },
  /**
   * Sends a BeAPI debug log to the content log in-game.
   * @param {string} message Primary message.
   * @param {string} optionalParams Optional extra fragments.
   */
  debug(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §d[DEBUG]:§r ${message} ${optionalParams.join(' ')}`)
  },
}

// Initialize Minimal Client With Only Tick Event.
export const client = new Client({
  enableEvents: ['Tick'],
})

// Create New Timers Util
const timers = new Timers()

// Start Timerss
timers.start(client)
