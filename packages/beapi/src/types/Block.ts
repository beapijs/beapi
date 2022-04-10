// Type imports.
import type { MinecraftBlockTypes } from 'mojang-minecraft'

/**
 * Get only block names on MinecraftBlockTypes.
 */
export type BlockTypes<T = keyof typeof MinecraftBlockTypes> = T extends 'prototype' ? never : T
