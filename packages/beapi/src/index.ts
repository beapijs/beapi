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

// Initialize And Export Client
export const client = new Client()

// Start Timers
timers.start(client)

// Export Types
export * from './types'
export * from './database'
