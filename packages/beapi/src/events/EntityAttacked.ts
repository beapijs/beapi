import type { Player } from '..'
import type { Client } from '../client'
import { between } from '../utils/between'

import AbstractEvent from './AbstractEvent'
export class EntityAttacked extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  public readonly name = 'EntityAttacked'
  public readonly iName = 'custom'
  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      this._client.addListener('Swing', this._logic)
    }
  }

  public off(): void {
    if (this._registered) {
      this._client.removeListener('Swing', this._logic)
    }
  }

  protected __logic(player: Player): void {
    const target = player.prevEntityInVector
    player.prevEntityInVector = undefined
    if (!target) return
    const targetPos = target?.getLocation()
    const playerPos = player?.getLocation()
    if (
      !(
        between(targetPos.x + 5, targetPos.x - 5, playerPos.x) &&
        between(targetPos.y + 5, targetPos.y - 5, playerPos.y) &&
        between(targetPos.z + 5, targetPos.z - 5, playerPos.z)
      )
    )
      return

    return this._client.emit(this.name, {
      player,
      target,
    })
  }
}
