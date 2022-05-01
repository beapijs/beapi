import type {
  BlockPistonComponent,
  BlockInventoryComponent,
  BlockRecordPlayerComponent,
  BlockLavaContainerComponent,
  BlockSnowContainerComponent,
  BlockWaterContainerComponent,
  BlockPotionContainerComponent,
  MinecraftBlockTypes,
} from 'mojang-minecraft'

export interface BlockComponents {
  piston: BlockPistonComponent
  inventory: BlockInventoryComponent
  record_player: BlockRecordPlayerComponent
  lava_container: BlockLavaContainerComponent
  snow_container: BlockSnowContainerComponent
  water_container: BlockWaterContainerComponent
  potion_container: BlockPotionContainerComponent
}

/**
 * Get only block names on MinecraftBlockTypes.
 */
export type BlockTypes<T = keyof typeof MinecraftBlockTypes> = T extends 'prototype'
  ? never
  : T extends 'get'
  ? never
  : T extends 'getAllBlockTypes'
  ? never
  : T
