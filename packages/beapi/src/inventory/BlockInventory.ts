import type { Client } from '..'
import type { BlockInventoryComponent as IInventory, InventoryComponentContainer as IContainer } from 'mojang-minecraft'
import type { EntityInventory } from './'
import { Item } from '../item'

export class BlockInventory {
  protected readonly _client: Client
  protected readonly _IInventory: IInventory
  protected readonly _IContainer: IContainer

  public constructor(client: Client, IInventory: IInventory) {
    this._client = client
    this._IInventory = IInventory
    this._IContainer = IInventory.container
  }

  public getIInventory(): IInventory {
    return this._IInventory
  }

  public getIContainer(): IContainer {
    return this._IContainer
  }

  public getSize(): number {
    return this._IContainer.size
  }

  public getEmtptySlots(): number {
    return this._IContainer.emptySlotsCount
  }

  public getItem(slot: number): Item {
    return new Item(this._client, this._IContainer.getItem(slot))
  }

  public setItem(slot: number, item: Item): void {
    return this._IContainer.setItem(slot, item.getIItem())
  }

  public addItem(item: Item): void {
    return this._IContainer.addItem(item.getIItem())
  }

  public transferItem(slot: number, otherSlot: number, inventory: BlockInventory | EntityInventory): boolean {
    return this._IContainer.swapItems(slot, otherSlot, inventory.getIContainer())
  }

  public swapItem(slot: number, otherSlot: number): boolean {
    return this._IContainer.transferItem(slot, otherSlot, this._IContainer)
  }
}
