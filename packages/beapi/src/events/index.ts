// Import all events.
import { OnChat } from './OnChat'
import { OnJoin } from './OnJoin'
import { OnLeave } from './OnLeave'
import { BlockCreated } from './BlockCreated'
import { BlockDestroyed } from './BlockDestroyed'
import { BlockHit } from './BlockHit'
import { ItemUse } from './ItemUse'
import { ItemInteract } from './ItemInteract'
import { ItemEvent } from './ItemEvent'
import { ItemDropped } from './ItemDropped'
import { EntityCreated } from './EntityCreated'
import { EntityDestroyed } from './EntityDestroyed'
import { PlayerTag } from './PlayerTag'
import { EntityTag } from './EntityTag'
import { EnteredWater } from './EnteredWater'
import { ExitedWater } from './ExitedWater'
import { Jump } from './Jump'
import { Landed } from './Landed'
import { Swing } from './Swing'
import { StartedBurning } from './StartedBurning'
import { StoppedBurning } from './StoppedBurning'
import { StartedMoving } from './StartedMoving'
import { StoppedMoving } from './StoppedMoving'
import { StartedRiding } from './StartedRiding'
import { StoppedRiding } from './StoppedRiding'
import { StartedSleeping } from './StartedSleeping'
import { StoppedSleeping } from './StoppedSleeping'
import { StartedSneaking } from './StartedSneaking'
import { StoppedSneaking } from './StoppedSneaking'
import { StartedSprinting } from './StartedSprinting'
import { StoppedSprinting } from './StoppedSprinting'
import { StartedSwimming } from './StartedSwimming'
import { StoppedSwimming } from './StoppedSwimming'
import { EntityHit } from './EntityHit'
import { PlayerHit } from './PlayerHit'
import { Explosion } from './Explosion'
import { Death } from './Death'
import { Respawn } from './Respawn'
import { Piston } from './Piston'
import { EffectAdded } from './EffectAdded'
import { WeatherUpdated } from './WeatherUpdated'
import { Tick } from './Tick'
import { EntityEventTrigger } from './EntityEventTrigger'
import { PlayerEventTrigger } from './PlayerEventTrigger'
import { ItemEventTrigger } from './ItemEventTrigger'
import { PlayerScoreUpdated } from './PlayerScoreUpdated'
import { EntityScoreUpdated } from './EntityScoreUpdated'
import { PlayerTagsUpdated } from './PlayerTagsUpdated'
import { EntityTagsUpdated } from './EntityTagsUpdated'
import { EntityHurt } from './EntityHurt'
import { PlayerHurt } from './PlayerHurt'
import { Lever } from './Lever'
import { ChestOpened } from './ChestOpened'
import { ServerInitialized } from './ServerInitialized'
import { ProjectileHitBlock } from './ProjectileHitBlock'
import { ProjectileHitEntity } from './ProjectileHitEntity'

// Export all events as an array.
export const events = [
  OnChat,
  OnJoin,
  OnLeave,
  BlockCreated,
  BlockDestroyed,
  BlockHit,
  ItemUse,
  ItemInteract,
  ItemEvent,
  ItemDropped,
  EntityCreated,
  EntityDestroyed,
  PlayerTag,
  EntityTag,
  EnteredWater,
  ExitedWater,
  Jump,
  Landed,
  Swing,
  StartedBurning,
  StoppedBurning,
  StartedMoving,
  StoppedMoving,
  StartedRiding,
  StoppedRiding,
  StartedSleeping,
  StoppedSleeping,
  StartedSneaking,
  StoppedSneaking,
  StartedSprinting,
  StoppedSprinting,
  StartedSwimming,
  StoppedSwimming,
  EntityHit,
  PlayerHit,
  Explosion,
  Death,
  Respawn,
  Piston,
  EffectAdded,
  WeatherUpdated,
  Tick,
  EntityEventTrigger,
  PlayerEventTrigger,
  ItemEventTrigger,
  PlayerScoreUpdated,
  EntityScoreUpdated,
  PlayerTagsUpdated,
  EntityTagsUpdated,
  EntityHurt,
  PlayerHurt,
  Lever,
  ChestOpened,
  ServerInitialized,
  ProjectileHitBlock,
  ProjectileHitEntity,
]

// Export abstract event.
export { default as AbstractEvent } from './AbstractEvent'
