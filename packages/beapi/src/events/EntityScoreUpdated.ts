import type { Client } from '../client'
import type { Entity } from '../entity'
import type { Objective } from '../types'

import AbstractEvent from './AbstractEvent'
export class EntityScoreUpdated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false
  protected readonly oldScores = new Map<Entity, { score: number; objective: Objective }[]>()
  protected ignoreNext = false

  public readonly name = 'EntityScoreUpdated'
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
    for (const [, entity] of this._client.entities.getAll()) {
      const scores: { score: number; objective: Objective }[] = []
      for (const objective of this._client.scoreboards.getObjectives()) {
        const score = entity.getScore(objective)
        scores.push({
          score,
          objective,
        })
      }
      if (!this.oldScores.has(entity)) {
        this.oldScores.set(entity, scores)
        continue
      }
      for (const old of this.oldScores?.get(entity) ?? []) {
        const currentScore = scores.find((x) => x.objective.id === old.objective.id)
        if (currentScore?.score === old.score) continue

        if (this.ignoreNext) {
          this.ignoreNext = false
          continue
        }

        this._client.emit(this.name, {
          entity,
          objective: currentScore?.objective ?? old.objective,
          value: currentScore?.score ?? 0,
          old: old.score,
          cancel: () => {
            entity.setScore(old.objective, old.score)
            this.ignoreNext = true
          },
        })
      }

      this.oldScores.set(entity, scores)
    }
  }
}
