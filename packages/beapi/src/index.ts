import { Client } from './client'
import { Timers } from './polyfill/Timers'

const log = console.warn

// Override Default Console Methods
// @ts-expect-error
globalThis.console = {
  log(message: string, ...optionalParams: string[]) {
    log(`[BeAPI] [LOG]: ${message} ${optionalParams.join(' ')}`)
  },
  error(message: string, ...optionalParams: string[]) {
    log(`[BeAPI] [ERROR]: ${message} ${optionalParams.join(' ')}`)
  },
  warn(message: string, ...optionalParams: string[]) {
    log(`[BeAPI] [WARN]: ${message} ${optionalParams.join(' ')}`)
  },
  info(message: string, ...optionalParams: string[]) {
    log(`[BeAPI] [INFO]: ${message} ${optionalParams.join(' ')}`)
  },
  debug(message: string, ...optionalParams: string[]) {
    log(`[BeAPI] [DEBUG]: ${message} ${optionalParams.join(' ')}`)
  },
}

// Create New Timers Util
const timers = new Timers()

// Initialize Client
const client = new Client()

// Start Timers
timers.start(client)

// Exports
export { client }

export * from './types'
export * from './database'
export * from './client'
export * from './commands'
export * from './entity'
export * from './events'
export * from './player'
export * from './polyfill'
export * from './utils'
export * from './world'
export * from './version'
