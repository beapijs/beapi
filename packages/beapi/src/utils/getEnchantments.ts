// Regular imports.
import { ItemEnchantsComponent, ItemStack, MinecraftEnchantmentTypes, Enchantment } from 'mojang-minecraft'

/**
 * Attempts to get all enchantments on an item.
 * @param item Item to get enchantments from.
 * @returns
 */
export function getEnchantments(item: ItemStack): Enchantment[] {
  // Intitialize enchaments return array.
  const enchantments: Enchantment[] = []

  // If not an item or item does not have enchantments nbt component return empty array.
  if (!item || !item.hasComponent('minecraft:enchantments')) return enchantments

  // Get the enchantment nbt component and typecast it as ItemEnchantsComponent.
  const component = item.getComponent('minecraft:enchantments') as ItemEnchantsComponent

  // For every key on MinecraftEnchantmentTypes execute some code.
  for (const enchant of Object.keys(MinecraftEnchantmentTypes) as (keyof MinecraftEnchantmentTypes)[]) {
    // If not item enchantments has enchant key in current iteration continue to next iteration.
    if (!component.enchantments.hasEnchantment(MinecraftEnchantmentTypes[enchant])) continue
    // Otherwise get level of current enchant on item provided.
    const value = component.enchantments.getEnchantment(MinecraftEnchantmentTypes[enchant])
    // Push data to final enchantment array
    enchantments.push(value)
  }

  // Return enchantments
  return enchantments
}
