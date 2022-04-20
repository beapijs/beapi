import type {
  EntityLavaMovementComponent,
  EntityBreathableComponent,
  EntityHealthComponent,
  EntityInventoryComponent,
  EntityMovementComponent,
  EntityRideableComponent,
  EntityUnderwaterMovementComponent,
  EntityAgeableComponent,
  EntityColorComponent,
  EntityFlyingSpeedComponent,
  EntityHealableComponent,
  EntityLeashableComponent,
  EntityMountTamingComponent,
  EntityStrengthComponent,
  EntityTameableComponent,
} from 'mojang-minecraft'

/**
 * Currently used player NBT components.
 */
// TODO: fill all available ones
// TODO: Add types for ones left as any
export interface EntityComponents {
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
  /**
   * Defines timer for the entity to grow up. It can be accelerated by giving the entity the items it likes as defined by feedItems.
   */
  'minecraft:ageable': EntityAgeableComponent
  /**
   * Defines the entity's color. Only works on certain entities that have predefined color values (sheep, llama, shulker).
   */
  'minecraft:color': EntityColorComponent
  /**
   * Defines the flying speed of an entity.
   */
  'minecraft:flying_speed': EntityFlyingSpeedComponent
  /**
   * Defines the interactions with this entity for healing it.
   */
  'minecraft:healable': EntityHealableComponent
  /**
   * Defines entities ability to be leashed and defines the conditions and events for this entity when is leashed.
   */
  'minecraft:leashable': EntityLeashableComponent
  /**
   * Defines options for taming a rideable entity based on the entity that mounts it.
   */
  'minecraft:mount_taming': EntityMountTamingComponent
  /**
   * Defines the entity's strength to carry items.
   */
  'minecraft:strength': EntityStrengthComponent
  /**
   * Defines the rules for a mob to be tamed by the player.
   */
  'minecraft:tameable': EntityTameableComponent
}
