// Regular imports.
import { setProto, AbstractEvent, ItemInteractEvent, Client, Player } from '..'

/**
 * BeAPI chest opened event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ChestOpened extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ChestOpened')
  public readonly name = 'ChestOpened'

  // Predefined in AbstractEvent.
  @setProto('custom')
  public readonly iName = 'custom'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI chest opened event. Contains the logic
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
      this._client.addListener('ItemInteract', this._logic)
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
      this._client.removeListener('ItemInteract', this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(data: ItemInteractEvent): void {
    // If event data does not contain a block inventory
    // or the source is not an instance of player return
    if (!data.block.getInventory() || !(data.source instanceof Player)) return

    // Chest block type.
    const type = data.block.getId().split(':')[1]

    // Emit this event on client using name defined above.
    this._client.emit(this.name, {
      block: data.block,
      player: data.source,
      type,
      cancel: () => {
        data.cancel()
      },
    })
  }
}
