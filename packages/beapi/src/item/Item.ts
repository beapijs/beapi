import type { Client } from '..'
import type {
  ItemStack as IItem,
  EnchantmentType,
  EntityInventoryComponent,
  BlockInventoryComponent,
} from 'mojang-minecraft'
import { getEnchantments } from '../'

// TODO: added method to set in a targets slot

export class Item {
  protected readonly _client: Client
  protected readonly _IItem: IItem

  public constructor(client: Client, IItem: IItem) {
    this._client = client
    this._IItem = IItem
  }

  public getIItem(): IItem {
    return this._IItem
  }

  public getId(): string {
    return this._IItem.id
  }

  public getAmount(): number {
    return this._IItem.amount
  }

  public getData(): number {
    return this._IItem.data
  }

  public getNameTag(): string {
    return this._IItem.nameTag
  }

  public setNameTag(nameTag: string): void {
    this._IItem.nameTag = nameTag
  }

  public getLore(): string[] {
    return this._IItem.getLore()
  }

  public hasLore(lore: string): boolean {
    if (this.getLore().find((x) => x === lore)) return true

    return false
  }

  public setLore(lore: string[]): void {
    this._IItem.setLore(lore)
  }

  public triggerEvent(event: string): void {
    this._IItem.triggerEvent(event)
  }

  // TODO: create typings
  public getComponents(): any[] {
    return this._IItem.getComponents()
  }

  public hasComponent(component: string): boolean {
    return this._IItem.hasComponent(component)
  }

  // TODO: create typings
  public getComponent(component: string): any {
    return this._IItem.getComponent(component)
  }

  public getEnchantments(): { type: EnchantmentType; level: number }[] {
    return getEnchantments(this._IItem)
  }

  // TODO: convert to new inventory
  public setInSlot(slot: number, inventory: EntityInventoryComponent | BlockInventoryComponent): void {
    inventory.container.setItem(slot, this._IItem)
  }
}
