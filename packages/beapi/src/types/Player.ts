// Type imports.
import type {
  EntityLavaMovementComponent,
  EntityBreathableComponent,
  EntityHealthComponent,
  EntityInventoryComponent,
  EntityMovementComponent,
  EntityRideableComponent,
  EntityUnderwaterMovementComponent,
  Player,
} from 'mojang-minecraft'

/**
 * Currently used player NBT components.
 */
// TODO: fill all available ones
// TODO: Add types for ones left as any
export interface PlayerComponents {
  /**
   * Defines the base movement speed in lava of this entity.
   */
  'minecraft:lava_movement': EntityLavaMovementComponent
  /**
   * Defines what blocks this entity can breathe in and gives them the ability to suffocate.
   */
  'minecraft:breathable': EntityBreathableComponent
  /**
   * Defines the health properties of an entity.
   */
  'minecraft:health': EntityHealthComponent
  /**
   * Defines this entity's inventory properties.
   */
  'minecraft:inventory': EntityInventoryComponent
  /**
   * Defines entities transparency when invisible.
   */
  'minecraft:is_hidden_when_invisible': any
  /**
   * Defines the general movement speed of this entity.
   */
  'minecraft:movement': EntityMovementComponent
  /**
   * Defines capability that an entity can be ridden by another entity.
   */
  'minecraft:rideable': EntityRideableComponent
  /**
   * Defines the general movement speed underwater of this entity.
   */
  'minecraft:underwater_movement': EntityUnderwaterMovementComponent
  /**
   * Defines capability of climbing.
   */
  'minecraft:can_climb': any
}

/**
 * Fog types.
 */
export type FogType = 'pop' | 'push' | 'remove'

/**
 * Camera shake types.
 */
export type CameraShakeType = 'positional' | 'rotational' | 'clear'

// TODO: Remove once types are made.
export interface DisplayPlayer extends Player {
  onScreenDisplay: OnScreenDisplay
}

// TODO: Remove once types are made.
export interface OnScreenDisplay {
  setTitle(title: string, options?: TitleDisplayOptions): void
  clearTitle(): void
  updateSubtitle(subtitle: string): void
  setActionBar(text: string): void
}

// TODO: Remove once types are made.
export interface TitleDisplayOptions {
  subtitle?: string
  fadeInSeconds: number
  staySeconds: number
  fadeOutSeconds: number
}
