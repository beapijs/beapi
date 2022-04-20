// Type imports.
import type { MinecraftEnchantmentTypes } from 'mojang-minecraft'

/**
 * Get only enchant names on MinecraftEnchantmentTypes.
 */
export type OnlyEnchants<T = keyof typeof MinecraftEnchantmentTypes> = T extends 'prototype' ? never : T
