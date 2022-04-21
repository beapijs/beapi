// Regular imports.
import { setProto, AbstractEvent, Client, PlayerTagEvent } from '..'

/**
 * BeAPI entered water event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EnteredWater extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EnteredWater')
  public readonly name = 'EnteredWater'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entered water event. Contains the logic
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
      this._client.addListener('PlayerTag', this._logic)
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
      this._client.removeListener('PlayerTag', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(data: PlayerTagEvent): void {
    // If the beapi tag is not "in_water" return
    if (data.tag !== 'in_water') return
    // Set player isInWater to true.
    data.player.isInWater(true)
    // Emit in wator event.
    this._client.emit(this.name, data.player)
  }
}
