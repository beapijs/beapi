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

export interface EntityComponents {
  'minecraft:lava_movement': EntityLavaMovementComponent
  'minecraft:breathable': EntityBreathableComponent
  'minecraft:health': EntityHealthComponent
  'minecraft:inventory': EntityInventoryComponent
  'minecraft:is_hidden_when_invisible': any
  'minecraft:movement': EntityMovementComponent
  'minecraft:rideable': EntityRideableComponent
  'minecraft:underwater_movement': EntityUnderwaterMovementComponent
  'minecraft:can_climb': any
  'minecraft:ageable': EntityAgeableComponent
  'minecraft:color': EntityColorComponent
  'minecraft:flying_speed': EntityFlyingSpeedComponent
  'minecraft:healable': EntityHealableComponent
  'minecraft:leashable': EntityLeashableComponent
  'minecraft:mount_taming': EntityMountTamingComponent
  'minecraft:strength': EntityStrengthComponent
  'minecraft:tameable': EntityTameableComponent
}
