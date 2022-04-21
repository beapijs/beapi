// Normal imports.
import { setProto, AbstractEvent, Item, Client } from '..'
import { BeforeItemDefinitionTriggeredEvent, world, Player } from 'mojang-minecraft'

/**
 * BeAPI item event event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class ItemEvent extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('ItemEvent')
  public readonly name = 'ItemEvent'

  // Predefined in AbstractEvent.
  @setProto('beforeItemDefinitionEvent')
  public readonly iName = 'beforeItemDefinitionEvent'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI item event event. Contains the logic
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

  protected __logic(arg: BeforeItemDefinitionTriggeredEvent): void {
    // If source is a player we dont care return.
    if (arg.source.id !== 'minecraft:player') return

    // Attempt to get the player.
    const player = this._client.players.getByIPlayer(arg.source as Player)

    // If no player return.
    if (!player) return

    // Emit de item evente.
    this._client.emit(this.name, {
      player: player,
      item: new Item(this._client, arg.item),
      event: arg.eventName,
      cancel() {
        arg.cancel = true
      },
    })
  }
}
