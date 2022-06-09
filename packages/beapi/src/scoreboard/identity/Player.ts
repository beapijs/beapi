// Type imports.
import type { Client, Player } from '../../'
import type { ScoreboardIdentity as IIdentity, Player as IPlayer } from 'mojang-minecraft'

export class PlayerIdentity {
  protected readonly client: Client
  protected readonly IIdentity: IIdentity

  public constructor(client: Client, IIdentity: IIdentity) {
    this.client = client
    this.IIdentity = IIdentity
  }

  public getIIdentity(): IIdentity {
    return this.IIdentity
  }

  public getId(): number {
    return this.IIdentity.id
  }

  public getDisplay(): string {
    return this.IIdentity.displayName
  }

  public getPlayer(): Player | undefined {
    const player = this.client.players.getByIPlayer(this.IIdentity.getEntity() as IPlayer)

    return player
  }
}
