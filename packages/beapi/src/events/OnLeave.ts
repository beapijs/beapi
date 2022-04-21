// Normal imports.
import { setProto, AbstractEvent, Client } from '..'
import { PlayerLeaveEvent, world } from 'mojang-minecraft'

/**
 * BeAPI leave event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class OnLeave extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('OnLeave')
  public readonly name = 'OnLeave'

  // Predefined in AbstractEvent.
  @setProto('playerLeave')
  public readonly iName = 'playerLeave'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI leave event. Contains the logic
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
      // Subscribe to Minecraft world event with IName
      // And use bound _logic for the callback.
      world.events[this.iName].subscribe(this._logic)
      // Set registered to true so this cannot be called
      // Again before off being called.
      this._registered = true
    }
  }

  // Predefined in AbstractEvent.
  public off(): void {
    // If currently registered.
    if (this._registered) {
      // Remove Minecraft event listener on IName
      // With bound _logic callback.
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(arg: PlayerLeaveEvent): void {
    // Attempt to get player.
    const player = this._client.players.getByName(arg.playerName)

    // If no player return.
    if (!player) return

    // Emit left player data.
    this._client.emit(this.name, player)

    // Remove player from player manager.
    this._client.players.remove(player)
  }
}
