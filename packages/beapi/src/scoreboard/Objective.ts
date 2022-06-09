// Type imports.
import { PlayerIdentity, EntityIdentity, FakeIdentity } from './'
import type { Client, Player, Entity } from '../'
import type { ScoreboardObjective as IObjective } from 'mojang-minecraft'

/**
 * BeAPI wrapper for ScoreboardObjective.
 */
export class Objective {
  /**
   * Protected readonly client instance.
   */
  protected readonly client: Client
  /**
   * Protected readonly IObjective instance.
   */
  protected readonly IObjective: IObjective

  /**
   * BeAPI wrapper for ScoreboardObjective.
   * @param {Client} client BeAPI instance.
   * @param {IObjective} IObjective IObjective instance.
   */
  public constructor(client: Client, IObjective: IObjective) {
    this.client = client
    this.IObjective = IObjective
  }

  /**
   * Get the vanilla objective instance.
   * @returns Vanilla instance.
   */
  public getIObjective(): IObjective {
    return this.IObjective
  }

  /**
   * Get the objectives id.
   * @returns Objective id.
   */
  public getId(): string {
    return this.IObjective.id
  }

  /**
   * Get the objectives display text.
   * @returns Display text.
   */
  public getDisplay(): string {
    return this.IObjective.displayName
  }

  /**
   * Get all the online players that are apart of the objective.
   * @returns Array of players.
   */
  public getPlayers(): Player[] {
    const entries = this.IObjective.getParticipants().filter((x) => x.type === 1)
    const identities = this.client.players.getAllAsArray().filter((x) => {
      return entries.find((y) => {
        return y.getEntity() === x.getIPlayer()
      })
    })

    return identities
  }

  /**
   * Get all the entites that are apart of the objective.
   * @returns Array of entities.
   */
  public getEntities(): Entity[] {
    const entries = this.IObjective.getParticipants().filter((x) => x.type === 2)
    const identities = this.client.entities.getAllAsArray().filter((x) => {
      return entries.find((y) => {
        return y.getEntity() === x.getIEntity()
      })
    })

    return identities
  }

  /**
   * Get all the fake players that are apart of the objective.
   * @returns Array of FakeIdentity player.
   */
  public getFakePlayers(): FakeIdentity[] {
    const entries = this.IObjective.getParticipants().filter((x) => x.type === 3)
    const identities = entries.map((x) => new FakeIdentity(this.client, x))

    return identities
  }

  /**
   * Get a score from the objective.
   * @param {PlayerIdentity | EntityIdentity | FakeIdentity} identity Entity / Player / Fake Identity.
   * @returns Number.
   */
  public getScore(identity: PlayerIdentity | EntityIdentity | FakeIdentity): number {
    try {
      return this.IObjective.getScore(identity.getIIdentity())
    } catch {
      return 0
    }
  }
}
