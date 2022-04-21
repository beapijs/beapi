// Type imports.
import type { Objective, ScoreboardSlot, Client } from '..'

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

  /**
   * Create a new scoreboard objective.
   * @param objective Objective to create.
   * @returns true means success
   */
  public createObjective(objective: Objective): boolean {
    // Check if objective already exists. If so return false.
    if (this.getObjectives().find((x) => x.id === objective.id)) return false

    // Attempt executing command to add a new scoreboard objective with the given objective object.
    const command = this._client.executeCommand(
      `scoreboard objectives add ${objective.id} ${objective.type ?? 'dummy'} "${objective.display ?? objective.id}"`,
    )

    // If error log to console and return false.
    if (command.err) return false

    // Everything was successful, return true.
    return true
  }

  /**
   * Attempt to remove an object by its id.
   * @param id Objective id.
   * @returns true means success
   */
  public removeObjective(id: string): boolean {
    // Check if the objective exists, if not return false.
    if (!this.getObjectives().find((x) => x.id === id)) return false

    // Attempt executing a command to remove the scoreboard with given id.
    const command = this._client.executeCommand(`scoreboard objectives remove ${id}`)

    // If error log to console and return false.
    if (command.err) return false

    // Everything was successful, return true.
    return true
  }

  /**
   * Attempts to get an array of all objectives.
   * @returns
   */
  public getObjectives(): Objective[] {
    // Initialize an empty objective array.
    const objectives: Objective[] = []

    // Attempt executing a command to list all objectives.
    const command = this._client.executeCommand('scoreboard objectives list')

    // If command gives error return empty objectives array.
    if (command.err) return objectives

    // Split the message on \n as all objectives are spaced via \n
    const split = command.statusMessage.split('\n')

    // For each line in the split statusMessage
    for (const line of split) {
      // If the line does not start with (-) its not a correct objective, continue.
      if (!line.startsWith('-')) continue

      // Split the line on space to seperate out the different parts.
      const split = line.split(' ')

      // Slice the objective name out of the line.
      const objective = split[1].slice(0, split[1].length - 1)
      // Use regex to extract the display name of the objective.
      const display = line.match(/'([^']+)'/)![0].replace(/'/g, '')
      // Use regex to attempt to extract the scoreboard type.
      const type = line
        .match(/type '([^']+)'/)![0]
        .replace(/'/g, '')
        .replace('type ', '')

      // Push all extractions to the objectives array.
      objectives.push({
        id: objective,
        display,
        type,
      })
    }

    // Return all found objectives.
    return objectives
  }

  /**
   * Set the display of a specfic objective.
   * @param objective Objective to set.
   * @param slot Set slot of objective.
   * @returns true means success
   */
  public setDisplay(objective: Objective, slot: ScoreboardSlot): boolean {
    // Attempt to set the display of the given objective.
    const command = this._client.executeCommand(`scoreboard objectives setdisplay ${slot} ${objective.id}`)

    // If error log error.
    if (command.err) return false
    return true
  }
}
