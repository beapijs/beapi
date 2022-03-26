import { WeatherChangeEvent, world } from 'mojang-minecraft'
import type { Client } from '../client'
import type { Dimension } from '../types'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'
export class WeatherUpdated extends AbstractEvent {
  protected readonly _logic = this.__logic.bind(this)
  protected readonly _client: Client
  protected _registered = false

  @setProto('WeatherUpdated')
  public readonly name = 'WeatherUpdated'

  @setProto('weatherChange')
  public readonly iName = 'weatherChange'

  public readonly alwaysCancel = false

  public constructor(client: Client) {
    super()
    this._client = client
  }

  public on(): void {
    if (!this._registered) {
      world.events[this.iName].subscribe(this._logic)
      this._registered = true
    }
  }

  public off(): void {
    if (this._registered) {
      world.events[this.iName].unsubscribe(this._logic)
      this._registered = false
    }
  }

  protected __logic(arg: WeatherChangeEvent): void {
    const dimension = this._client.world.getDimension(arg.dimension as Dimension)
    this._client.emit(this.name, {
      lightning: arg.lightning,
      raining: arg.raining,
      dimension,
    })
  }
}
