import type { Client, Enchantment } from '..'
import {
  ItemStack as IItem,
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

  public getEnchantments(): (Enchantment | undefined)[] {
    const enchantments: (Enchantment | undefined)[] = []
    for (const x of getEnchantments(this._IItem)) {
      const enchant = this.getEnchantment({
        name: x.type.id as keyof typeof MinecraftEnchantmentTypes,
      })
      enchantments.push(enchant)
    }

    return enchantments
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

  public removeEnchantment(enchantment: Enchantment): boolean {
    if (!this.hasComponent('minecraft:enchantments')) return false
    if (!this.hasEnchantment(enchantment)) return false
    const component = this._IItem.getComponent('minecraft:enchantments') as ItemEnchantsComponent
    const enchantments = component.enchantments
    // @ts-ignore
    enchantments.removeEnchantment(new IEnchantment(MinecraftEnchantmentTypes[enchantment.name]).type)
    component.enchantments = enchantments

    return true
  }

  public hasEnchantment(enchantment: Enchantment): boolean {
    if (!this.hasComponent('minecraft:enchantments')) return false
    const component = this._IItem.getComponent('minecraft:enchantments') as ItemEnchantsComponent
    const enchantments = component.enchantments
    const status = enchantments.hasEnchantment(
      // @ts-ignore
      new IEnchantment(MinecraftEnchantmentTypes[enchantment.name]).type,
    )
    if (status === 0) return false

    return true
  }

  public getEnchantment(enchantment: Enchantment): Enchantment | undefined {
    if (!this.hasComponent('minecraft:enchantments')) return
    if (!this.hasEnchantment(enchantment)) return
    const component = this._IItem.getComponent('minecraft:enchantments') as ItemEnchantsComponent
    const enchantments = component.enchantments
    // @ts-ignore
    const found = enchantments.getEnchantment(new IEnchantment(MinecraftEnchantmentTypes[enchantment.name]).type)

    return {
      name: found.type.id as keyof typeof MinecraftEnchantmentTypes,
      level: found.level ?? 0,
    }
  }

  public setInSlot(slot: number, inventory: EntityInventory | BlockInventory): void {
    inventory.setItem(slot, this)
  }
}
