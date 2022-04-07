import type * as Minecraft from 'mojang-minecraft'
/**
 * Weather status types.
 */
export type Weather = 'clear' | 'rain' | 'thunder'

/**
 * Difficulty status types.
 */
export type Difficulty = 'peaceful' | 'easy' | 'normal' | 'hard'

export interface DynamicPropertiesDefinition {
  defineNumber(id: string): void
  defineString(id: string, maxLength: number): void
  defineBoolean(id: string): void
}

export interface PropertyRegistry {
  registerEntityTypeDynamicProperties(
    property: DynamicPropertiesDefinition,
    entityType: any /* Minecraft.EntityType */,
  ): void
  registerWorldDynamicProperties(property: DynamicPropertiesDefinition): void
}

export interface World extends Minecraft.World {
  setDynamicProperty(id: string, value: string | boolean | number): boolean
  removeDynamicProperty(id: string): boolean
  getDynamicProperty(id: string): string | boolean | number
}
