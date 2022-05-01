import type { Color, Vector } from 'mojang-minecraft'
import type { Entity } from '..'

/**
 * Dimension names.
 */
export type DimensionType = 'overworld' | 'nether' | 'the end'

/**
 * Dimension namespaces
 */
export type DimensionNamespace = 'minecraft:overworld' | 'minecraft:nether' | 'minecraft:the_end'

export interface ParticleOptions {
  id: string
  type: 'RGB' | 'RGBA' | 'SpeedAndDirection' | 'Vector'
  color?: Color
  speed?: number
  vector?: Vector
}

export interface ExplosionOptions {
  allowUnderwater: boolean
  breaksBlocks: boolean
  causesFire: boolean
  source: Entity
}
