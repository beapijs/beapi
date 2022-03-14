import type { Client } from '../client'
import type { Objective, ScoreboardSlot } from '..'

export class ScoreboardManager {
  protected readonly _client: Client

  public constructor(client: Client) {
    this._client = client
  }

  public createObjective(objective: Objective): boolean {
    if (this.getObjectives().find((x) => x.id === objective.id)) return false
    const command = this._client.executeCommand(
      `scoreboard objectives add ${objective.id} ${objective?.type ?? 'dummy'} "${objective?.display ?? objective.id}"`,
    )
    if (command.err) {
      console.error(command.statusMessage)

      return false
    }

    return true
  }

  public removeObjective(id: string): boolean {
    if (!this.getObjectives().find((x) => x.id === id)) return false
    const command = this._client.executeCommand(`scoreboard objectives remove ${id}`)
    if (command.err) {
      console.error(command.statusMessage)

      return false
    }

    return true
  }

  public getObjectives(): Objective[] {
    const objectives: Objective[] = []
    const command = this._client.executeCommand('scoreboard objectives list')
    if (command.err) return objectives
    const split = command.statusMessage.split('\n')
    for (const line of split) {
      if (!line.startsWith('-')) continue
      const objective = line.split(' ')[1].slice(0, line.split(' ')[1].length - 1)
      const display = ((line.match(/'([^']+)'/) as any)[0] as string).replace(/'/g, '')
      const type = ((line.match(/type '([^']+)'/) as any)[0] as string).replace(/'/g, '').replace('type ', '')
      objectives.push({
        id: objective,
        display,
        type,
      })
    }

    return objectives
  }

  public setDisplay(objective: Objective, slot: ScoreboardSlot): void {
    const command = this._client.executeCommand(`scoreboard objectives setdisplay ${slot} ${objective.id}`)
    if (!command.err) return

    return console.log(command.statusMessage)
  }
}
