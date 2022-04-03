import type { Block, Dimension, Player as IPlayer } from 'mojang-minecraft'

// TEMP: Mojang Needs To Update Typings
/**
 * Mojang Block Event
 */
export interface BlockEvent {
  /**
   * Block that event occured on.
   */
  readonly block: Block
  /**
   * Dimension event occured in.
   */
  readonly dimension: Dimension
  /**
   * Player that triggered the event.
   */
  readonly player: IPlayer
}
