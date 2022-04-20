import { world, Block as IBlock, Dimension as IDimension } from 'mojang-minecraft'
import type { Client } from '../client'
import { Block } from '../block'
import { setProto } from '../'
import AbstractEvent from './AbstractEvent'

// TEMP: Mojang keep on top of your typings or hire me at <Nobu : chat@nobu.sh>
export interface LeverActivateEvent {
  block: IBlock
  dimension: IDimension
  isPowered: boolean
}

/**
 * BeAPI lever use event. Contains the logic
 * for translating Minecraft event data to BeAPI
 * wrapped data.
 */
export class Lever extends AbstractEvent {
  // Predefined in AbstractEvent.
  protected readonly _logic = this.__logic.bind(this)
  // Predefined in AbstractEvent.
  protected readonly _client: Client
  // Predefined in AbstractEvent.
  protected _registered = false

  // Predefined in AbstractEvent.
  @setProto('Lever')
  public readonly name = 'Lever'

  // Predefined in AbstractEvent.
  @setProto('leverActivate')
  public readonly iName = 'leverActivate'

  // Predefined in AbstractEvent.
  public readonly alwaysCancel = false

  /**
   * BeAPI lever use event. Contains the logic
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
      // @ts-ignore TEMP: util Minecraft typings are updated.
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
      // @ts-ignore TEMP: util Minecraft typings are updated.
      world.events[this.iName].unsubscribe(this._logic)
      // Set registered to false so this cannot be called
      // Again before on being called.
      this._registered = false
    }
  }

  // Predefined in AbstractEvent.
  protected __logic(arg: LeverActivateEvent): void {
    // Get the block.
    const block = new Block(this._client, arg.block)

    // Emit the client event.
    this._client.emit(this.name, {
      block,
      dimension: arg.dimension,
      powered: arg.isPowered,
      cancel: () => {
        // For cancel we just permute the block to its original state.
        const permutation = block.getPermutation()
        const bit = permutation.getProperty('open_bit') as { name: string; value: boolean }
        if (bit.value) bit.value = false
        if (!bit.value) bit.value = true
        block.setPermutation(permutation)
      },
    })
  }
}
