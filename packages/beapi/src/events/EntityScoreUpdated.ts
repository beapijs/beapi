// Regular imports.
import AbstractEvent from './AbstractEvent'
import { setProto } from '../'

// Type imports.
import type { Client } from '../client'
import type { Entity } from '../entity'
import type { Objective } from '../types'

// Private OldScore Interface.
interface OldScore {
  score: number
  objective: Objective
}

/**
 * BeAPI entity score updated event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityScoreUpdated extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Map of old scores per entity.
  protected readonly oldScores = new Map<Entity, OldScore[]>()

  // Protected for ignoring next score update for player id.
  protected ignoreNextFor: Entity[] = []

  // Predefined in AbstractEvent.
  @setProto('EntityScoreUpdated')
  public readonly name = 'EntityScoreUpdated'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity score updated event. Contains the logic
   * for translating Minecraft event data to BeAPI
   * wrapped data.
   * @param client Client referece.
   */
  public constructor(client: Client) {
    super()
    this._client = client
  }

  // Predefined in AbstractEvent.
  public on(): void {
    // If not already registered.
    if (!this._registered) {
      // Subscribe to Client event with needed logic
      // And use bound _logic for the callback.
      this._client.addListener('Tick', this._logic)
      // Set registered to true so this cannot be called
      // Again before off being called.
      this._registered = true
    }
  }

  // Predefined in AbstractEvent.
  public off(): void {
    // If currently registered.
    if (this._registered) {
      // Remove Client event listener used
      // With bound _logic callback.
      this._client.removeListener('Tick', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(): void {
    // For every entity in entity manager, iterate.
    for (const [, entity] of this._client.entities.getAll()) {
      // Initialize empty old score array.
      const scores: OldScore[] = []

      // For every objective in world, iterate.
      for (const objective of this._client.scoreboards.getObjectives()) {
        // Get the score for entity on objective.
        const score = entity.getScore(objective)

        // Push their current score to scores array.
        scores.push({
          score,
          objective,
        })
      }

      // If entity does not have old score set current ones and continue
      if (!this.oldScores.has(entity)) {
        this.oldScores.set(entity, scores)
        continue
      }

      // Iterate through all the current scores and compare with old scores
      for (const oldScore of this.oldScores.get(entity)!) {
        // Attempt to find the current score.
        const currentScore = scores.find((x) => x.objective.id === oldScore.objective.id)
        // If not current score skip.
        if (!currentScore) continue
        // If current score equals old score skip.
        if (currentScore.score === oldScore.score) continue

        // If ignore next, ignore this iteration
        if (this.ignoreNextFor.includes(entity)) {
          // Remove first occurance of their id in removeNextFor array.
          this.ignoreNextFor.splice(this.ignoreNextFor.indexOf(entity), 1)
          continue
        }

        // Emit score updated event.
        this._client.emit(this.name, {
          entity,
          objective: currentScore.objective,
          value: currentScore.score,
          old: oldScore.score,
          cancel: () => {
            this.ignoreNextFor.push(entity)
            entity.setScore(oldScore.objective, oldScore.score)
          },
        })
      }

      // Set old score to current scores.
      this.oldScores.set(entity, scores)
    }

    // Cleanup old entity scores to prevent possible memory leak
    for (const [entity] of this.oldScores) {
      // Try to get the entities id. If it returns an error
      // (which it will when its dead as you are trying to access
      // released memory through a now invalidated pointer)
      // The remove it from old scores.
      try {
        entity.getIEntity().id
      } catch {
        this.ignoreNextFor = this.ignoreNextFor.filter((i) => i !== entity)
        this.oldScores.delete(entity)
      }
    }
  }
}
