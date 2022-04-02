import type { Client, Enchantment } from '..'
import {
  ItemStack as IItem,
  EnchantmentType,
  ItemEnchantsComponent,
  MinecraftEnchantmentTypes,
  Enchantment as IEnchantment,
} from 'mojang-minecraft'
import type { EntityInventory, BlockInventory } from '../inventory'
import { getEnchantments } from '../'

// TODO: wrap enchantment

export class Item {
  protected readonly _client: Client
  protected _IItem: IItem

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

  public addEnchatment(enchantment: Enchantment): boolean {
    if (!this.hasComponent('minecraft:enchantments')) return false
    const component = this._IItem.getComponent('minecraft:enchantments') as ItemEnchantsComponent
    const enchantments = component.enchantments
    const status = enchantments.addEnchantment(
      // @ts-ignore
      new IEnchantment(MinecraftEnchantmentTypes[enchantment.name], enchantment?.level ?? 1),
    )
    if (!status) return false
    component.enchantments = enchantments

    return true
  }

  public removeEnchantment(enchantment: Enchantment): void {
    if (!this.hasComponent('minecraft:enchantments')) return
    const component = this._IItem.getComponent('minecraft:enchantments') as ItemEnchantsComponent
    const enchantments = component.enchantments
    // @ts-ignore
    enchantments.removeEnchantment(new IEnchantment(MinecraftEnchantmentTypes[enchantment.name]).type)
    component.enchantments = enchantments
  }

  public setInSlot(slot: number, inventory: EntityInventory | BlockInventory): void {
    inventory.setItem(slot, this)
  }
}
