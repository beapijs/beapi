// Regular imports.
import { AbstractEvent, setProto, Block, Client } from '..'
import { world, BlockPlaceEvent } from 'mojang-minecraft'

/**
 * BeAPI block created event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class BlockCreated extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('BlockCreated')
  public readonly name = 'BlockCreated'

  // Predefined in AbstractEvent.
  @setProto('blockPlace')
  public readonly iName = 'blockPlace'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI block created event. Contains the logic
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
  protected __logic(arg: BlockPlaceEvent): void {
    // Attempt to get the player who created the block.
    const player = this._client.players.getByIPlayer(arg.player)
    // If not player could be found return.
    if (!player) return

    // Emit this event on client using name defined above.
    this._client.emit(this.name, {
      player,
      block: new Block(this._client, arg.block),
      dimension: player.getDimension(),
      cancel() {
        // TODO: change this to a block permutation instead.
        const dim = arg.dimension
        const pos = arg.block.location
        if (player.getGamemode() === 'creative') {
          dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air`)
        } else {
          dim.runCommand(`setblock ${pos.x} ${pos.y} ${pos.z} air 0 destroy`)
        }
      },
    })
  }
}
