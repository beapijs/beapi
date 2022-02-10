import type {
  EntityLavaMovementComponent,
  EntityBreathableComponent,
  EntityHealthComponent,
  EntityInventoryComponent,
  EntityMovementComponent,
  EntityRideableComponent,
  EntityUnderwaterMovementComponent,
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
}
