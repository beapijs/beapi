/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ItemEnchantsComponent, ItemStack, MinecraftEnchantmentTypes, EnchantmentType } from 'mojang-minecraft'

export function getEnchantments(item: ItemStack): { type: EnchantmentType; level: number }[] {
  const enchantments: { type: EnchantmentType; level: number }[] = []
  if (!item || !item.hasComponent('minecraft:enchantments')) return enchantments
  const component = item.getComponent('minecraft:enchantments') as ItemEnchantsComponent
  for (const enchant of Object.keys(MinecraftEnchantmentTypes)) {
    // @ts-ignore
    if (!component.enchantments.hasEnchantment(MinecraftEnchantmentTypes[enchant as EnchantmentType])) continue
    // @ts-ignore
    const value = component.enchantments.getEnchantment(MinecraftEnchantmentTypes[enchant as EnchantmentType])
    enchantments.push(value)
  }

  return enchantments
}
