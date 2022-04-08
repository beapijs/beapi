import type { Color, Vector } from 'mojang-minecraft'

/**
 * Dimension names.
 */
export type DimensionType = 'overworld' | 'nether' | 'the end'

export interface ParticleOptions {
  id: string
  type: 'RGB' | 'RGBA' | 'SpeedAndDirection' | 'Vector'
  color?: Color
  speed?: number
  vector?: Vector
}
