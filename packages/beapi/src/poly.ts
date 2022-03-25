import { Client } from './client'
import { Timers } from './polyfill/Timers'

// Initialize Minimal Client With Only Tick Event.
export const client = new Client({
  enableEvents: ['Tick'],
})

// Create New Timers Util
const timers = new Timers()

// Start Timers
timers.start(client)

// Create original console warn reference.
const log = console.warn

// Override Default Console Methods
// @ts-expect-error
globalThis.console = {
  log(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r §b[LOG]:§r ${message} ${optionalParams.join(' ')}`)
  },
  error(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §c[ERROR]:§r ${message} ${optionalParams.join(' ')}`)
  },
  warn(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §g[WARN]:§r ${message} ${optionalParams.join(' ')}`)
  },
  info(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §a[INFO]:§r ${message} ${optionalParams.join(' ')}`)
  },
  debug(message: string, ...optionalParams: string[]) {
    log(`§9[BeAPI]§r  §d[DEBUG]:§r ${message} ${optionalParams.join(' ')}`)
  },
}
