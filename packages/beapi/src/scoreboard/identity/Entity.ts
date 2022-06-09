// Type imports.
import type { Client, Entity } from '../../'
import type { ScoreboardIdentity as IIdentity } from 'mojang-minecraft'

export class EntityIdentity {
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

  public getEntity(): Entity | undefined {
    const Entity = this.client.entities.getByIEntity(this.IIdentity.getEntity())

    return Entity
  }
}
