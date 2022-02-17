import { Client } from './client'
import { Timers } from './polyfill/Timers'

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
export * from './forms'
export * from './player'
export * from './polyfill'
export * from './utils'
export * from './world'
export * from './version'

export { MinecraftItemTypes, ItemStack, EffectType, BlockPermutation } from 'mojang-minecraft'
