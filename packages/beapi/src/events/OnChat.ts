// Normal imports.
import { setProto, AbstractEvent, Client } from '..'
import { BeforeChatEvent, world } from 'mojang-minecraft'

/**
 * BeAPI chat event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class OnChat extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('OnChat')
  public readonly name = 'OnChat'

  // Predefined in AbstractEvent.
  @setProto('beforeChat')
  public readonly iName = 'beforeChat'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI chat event. Contains the logic
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

  protected __logic(arg: BeforeChatEvent): void {
    // Attempt to get the sender of the message.
    const sender = arg.sender.name
      ? this._client.players.getByName(arg.sender.name)
      : this._client.players.getByNameTag(arg.sender.nameTag)

    // If no sender return.
    if (!sender) return

    // If the sender is muted cancel message from reaching chat.
    if (sender.isMuted()) arg.cancel = true

    // Emit event.
    this._client.emit(this.name, {
      sender,
      message: arg.message,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
