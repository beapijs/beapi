// Regular imports.
import { setProto, AbstractEvent, Client } from '..'
import { world, Player as IPlayer, EntityCreateEvent } from 'mojang-minecraft'

/**
 * BeAPI entity created event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class EntityCreated extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('EntityCreated')
  public readonly name = 'EntityCreated'

  // Predefined in AbstractEvent.
  @setProto('entityCreate')
  public readonly iName = 'entityCreate'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI entity created event. Contains the logic
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
  protected __logic(arg: EntityCreateEvent): void {
    // If entity is instance of a player we dont want.
    if (arg.entity instanceof IPlayer) return

    // Create a new entity using entity manager.
    const entity = this._client.entities.create(arg.entity)
    // Add the newly created entity to entity manager.
    this._client.entities.add(entity)

    // Emit event with new entity.
    this._client.emit(this.name, entity)
  }
}
