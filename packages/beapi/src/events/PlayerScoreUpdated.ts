import type { Client } from '../client'
import type { Player } from '../player'
import type { Objective } from '../types'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'

// FIXME: Broken event see:
// LINK: ./index.ts

export class PlayerScoreUpdated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false
  protected readonly oldScores = new Map<Player, { score: number; objective: Objective }[]>()
  protected ignoreNext = false

  @setProto('PlayerScoreUpdated')
  public readonly name = 'PlayerScoreUpdated'

  @setProto('custom')
  public readonly iName = 'custom'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('Tick', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('Tick', this._logic)
    }
  }

  protected __logic(): void {
    for (const [, player] of this._client.players.getAll()) {
      const scores: { score: number; objective: Objective }[] = []
      for (const objective of this._client.scoreboards.getObjectives()) {
        const score = player.getScore(objective)
        scores.push({
          score,
          objective,
        })
      }
      if (!this.oldScores.has(player)) {
        this.oldScores.set(player, scores)
        continue
      }
      for (const old of this.oldScores?.get(player) ?? []) {
        const currentScore = scores.find((x) => x.objective.id === old.objective.id)
        if (currentScore?.score === old.score) continue

        if (this.ignoreNext) {
          this.ignoreNext = false
          continue
        }

        this._client.emit(this.name, {
          player,
          objective: currentScore?.objective ?? old.objective,
          value: currentScore?.score ?? 0,
          old: old.score,
          cancel: () => {
            player.setScore(old.objective, old.score)
            this.ignoreNext = true
          },
        })
      }

      this.oldScores.set(player, scores)
    }
  }
}
