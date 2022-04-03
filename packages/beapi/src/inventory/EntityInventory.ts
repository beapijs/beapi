// Normal imports.
import { Item } from '../item'

// Type imports.
import type { Client } from '..'
import type {
  EntityInventoryComponent as IInventory,
  InventoryComponentContainer as IContainer,
} from 'mojang-minecraft'
import type { BlockInventory } from './'

/**
 * BeAPI entity inventory wrapper.
 * Acts as a central point for easily interacting
 * with a player/entity inventories.
 */
export class EntityInventory {
  /**
   * Protected circular client reference.
   */
  protected readonly _client: Client
  /**
   * Protected Minecraft inventory component to wrap.
   */
  protected readonly _IInventory: IInventory
  /**
   * Protected Minecraft container component to wrap.
   */
  protected readonly _IContainer: IContainer

  /**
   * BeAPI entity inventory wrapper.
   * Acts as a central point for easily interacting
   * with a player/entities inventory.
   * @param client Client reference.
   * @param IInventory Inventory to wrap.
   */
  public constructor(client: Client, IInventory: IInventory) {
    this._client = client
    this._IInventory = IInventory
    this._IContainer = IInventory.container
  }

  /**
   * Get Minecraft inventory component being wrapped.
   * @returns
   */
  public getIInventory(): IInventory {
    return this._IInventory
  }

  /**
   * Get Minecraft container component being wrapped.
   * @returns
   */
  public getIContainer(): IContainer {
    return this._IContainer
  }

  /**
   * Gets the containers size.
   * @returns
   */
  public getSize(): number {
    return this._IContainer.size
  }

  /**
   * Gets the amount of empty slots in the container.
   * @returns
   */
  public getEmptySlots(): number {
    return this._IContainer.emptySlotsCount
  }

  /**
   * Gets the item in a specfic slot.
   * @param slot Slot to check item for.
   * @returns
   */
  public getItem(slot: number): Item {
    return new Item(this._client, this._IContainer.getItem(slot))
  }

  /**
   * Sets an item in the container.
   * @param slot Slot to set item.
   * @param item Item to set.
   * @returns
   */
  public setItem(slot: number, item: Item): void {
    return this._IContainer.setItem(slot, item.getIItem())
  }

  /**
   * Adds an item to the container,
   * most likely spits it out on ground if cannot fit.
   * @param item Item to add.
   * @returns
   */
  public addItem(item: Item): void {
    return this._IContainer.addItem(item.getIItem())
  }

  /**
   * Transfer an item from this inventory to another inventory.
   * @param slot Slot to in current inventory.
   * @param otherSlot Slot in other inventory.
   * @param inventory Inventory to swap with.
   * @returns
   */
  public transferItem(slot: number, otherSlot: number, inventory: BlockInventory | EntityInventory): boolean {
    return this._IContainer.swapItems(slot, otherSlot, inventory.getIContainer())
  }

  /**
   * Swap items slots in current inventory.
   * @param slot First slot to swap.
   * @param otherSlot Second slot to swap.
   * @returns
   */
  public swapItem(slot: number, otherSlot: number): boolean {
    return this._IContainer.transferItem(slot, otherSlot, this._IContainer)
  }
}
