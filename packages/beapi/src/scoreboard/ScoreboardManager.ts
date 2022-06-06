// Type imports.
import type { Client } from '../client'
import type { ScoreboardSlot } from '..'
import type { ScoreboardObjective } from 'mojang-minecraft'

/**
 * Scoreboard manager is the main main
 * hub for interacting with scoreboards.
 */
export class ScoreboardManager {
  /**
   * Protected client circular reference.
   */
  protected readonly _client: Client

  /**
   * Scoreboard manager is the main main
   * hub for interacting with scoreboards.
   * @param client Client reference.
   */
  public constructor(client: Client) {
    this._client = client
  }

  public createObjective(objective: string, display?: string): boolean {
    // Check if objective already exists. If so return false.
    if (this.getObjectives().find((x) => x.id === objective)) return false

    // Attempt executing command to add a new scoreboard objective with the given objective object.
    const command = this._client.executeCommand(
      `scoreboard objectives add ${objective} dummy "${display ?? objective}"`,
    )

    // If error log to console and return false.
    if (command.err) return false

    // Everything was successful, return true.
    return true
  }

  /**
   * Attempt to remove an object by its id.
   * @param Objective Objective.
   * @returns true means success
   */
  public removeObjective(objective: string): boolean {
    // Check if the objective exists, if not return false.
    if (!this.getObjectives().find((x) => x.id === objective)) return false

    // Attempt executing a command to remove the scoreboard with given id.
    const command = this._client.executeCommand(`scoreboard objectives remove ${objective}`)

    // If error log to console and return false.
    if (command.err) return false

    // Everything was successful, return true.
    return true
  }

  /**
   * Attempts to find an objective by given id.
   * @param objective Identifier of the scoreboard.
   * @returns
   */
  public getObjective(objective: string): ScoreboardObjective {
    return this._client.world.getIWorld().scoreboard.getObjective(objective)
  }

  /**
   * Attempts to get all objectives.
   * @returns
   */
  public getObjectives(): ScoreboardObjective[] {
    return this._client.world.getIWorld().scoreboard.getObjectives()
  }

  /**
   * Set the display of a specfic objective.
   * @param objective Objective to set.
   * @param slot Set slot of objective.
   * @returns true means success
   */
  public setDisplay(objective: ScoreboardObjective, slot: ScoreboardSlot): boolean {
    // Attempt to set the display of the given objective.
    const command = this._client.executeCommand(`scoreboard objectives setdisplay ${slot} ${objective.id}`)

    // If error log error.
    if (command.err) return false
    return true
  }
}
