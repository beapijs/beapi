// Initialize the polyfill.
import './poly'

// SECTION Root level exports.

// BeAPI exports.
export * from './types'
export * from './decorators'
export * from './database'
export * from './agent'
export * from './block'
export * from './client'
export * from './commands'
export * from './entity'
export * from './events'
export * from './forms'
export * from './inventory'
export * from './item'
export * from './player'
export * from './polyfill'
export * from './utils'
export * from './world'
export * from './version'

// Circular Mojang exports.
export * as Minecraft from 'mojang-minecraft'
export * as Gametest from 'mojang-gametest'

// !SECTION
