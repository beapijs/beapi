import type { Client } from '../client/Client'

export default abstract class {
  protected abstract readonly _client: Client
  protected abstract readonly _logic: CallableFunction
  public abstract readonly name: string
  public abstract readonly iName: string
  public abstract readonly alwaysCancel: boolean
  public abstract on(): void
  public abstract off(): void
  protected abstract __logic(...args: any[]): void
}
