// Type imports.
import type { MinecraftEnchantmentTypes } from 'mojang-minecraft'

// FIXME: This is uneeded, remove once cleanup reaches item class.
export interface Enchantment {
  name: keyof typeof MinecraftEnchantmentTypes
  level?: number
}
