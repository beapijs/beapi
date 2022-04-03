/**
 * Scoreboard objective object representatation.
 */
export interface Objective {
  /**
   * Objectives identifier.
   */
  id: string
  /**
   * Scoreboard display name.
   */
  display?: string
  /**
   * Scoreboard type. Usually `dummy`.
   */
  type?: string
}

/**
 * Scoreboard slot area.
 */
export type ScoreboardSlot = 'sidebar' | 'list' | 'belowname'
