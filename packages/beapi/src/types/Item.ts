// Type imports.
import type { MinecraftEnchantmentTypes, MinecraftItemTypes } from 'mojang-minecraft'

/**
 * Get only enchant names on MinecraftEnchantmentTypes.
 */
export type EnchantTypes<T = keyof typeof MinecraftEnchantmentTypes> = T extends 'prototype' ? never : T

/**
 * Get only item names on MinecraftItemTypes.
 */
export type ItemTypes<T = keyof typeof MinecraftItemTypes> = T extends 'prototype' ? never : T
