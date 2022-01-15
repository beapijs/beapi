import type { Block, Dimension, Player as IPlayer } from 'mojang-minecraft'

// TEMP: Mojang Needs To Update Typings
export interface BlockEvent {
  readonly block: Block
  readonly dimension: Dimension
  readonly player: IPlayer
}
