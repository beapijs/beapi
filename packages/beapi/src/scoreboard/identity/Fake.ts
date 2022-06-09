// Type imports.
import type { Client } from '../../'
import type { ScoreboardIdentity as IIdentity } from 'mojang-minecraft'

export class FakeIdentity {
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
}
