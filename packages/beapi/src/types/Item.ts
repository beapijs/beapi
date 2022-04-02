import type { MinecraftEnchantmentTypes } from 'mojang-minecraft'

export interface Enchantment {
  name: keyof typeof MinecraftEnchantmentTypes
  level?: number
}
