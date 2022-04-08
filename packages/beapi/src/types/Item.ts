// Type imports.
import type { MinecraftEnchantmentTypes, MinecraftItemTypes } from 'mojang-minecraft'

/**
 * Get only enchant names on MinecraftEnchantmentTypes.
 */
export type OnlyEnchants<T = keyof typeof MinecraftEnchantmentTypes> = T extends 'prototype' ? never : T

/**
 * Get only item names on MinecraftItemTypes.
 */
export type ItemType<T = keyof typeof MinecraftItemTypes> = T extends 'prototype' ? never : T
