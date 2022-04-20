import type {
  BlockPistonComponent,
  BlockInventoryComponent,
  BlockRecordPlayerComponent,
  BlockLavaContainerComponent,
  BlockSnowContainerComponent,
  BlockWaterContainerComponent,
  BlockPotionContainerComponent,
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
