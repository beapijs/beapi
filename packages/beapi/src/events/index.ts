import { OnChat } from './OnChat'
import { OnJoin } from './OnJoin'
import { OnLeave } from './OnLeave'
import { BlockCreated } from './BlockCreated'
import { BlockDestroyed } from './BlockDestroyed'
import { ItemUse } from './ItemUse'
import { ItemInteract } from './ItemInteract'
import { ItemEvent } from './ItemEvent'
import { ItemDropped } from './ItemDropped'
import { EntityCreated } from './EntityCreated'
import { EntityDestroyed } from './EntityDestroyed'
import { PlayerInViewVector } from './PlayerInViewVector'
import { EntityInViewVector } from './EntityInViewVector'
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
import { EntityAttacked } from './EntityAttacked'
import { PlayerAttacked } from './PlayerAttacked'
import { Explosion } from './Explosion'
import { Death } from './Death'
import { Respawn } from './Respawn'
import { Piston } from './Piston'
import { EffectAdded } from './EffectAdded'
import { WeatherUpdated } from './WeatherUpdated'
import { Tick } from './Tick'

export const events = [
  OnChat,
  OnJoin,
  OnLeave,
  BlockCreated,
  BlockDestroyed,
  ItemUse,
  ItemInteract,
  ItemEvent,
  ItemDropped,
  EntityCreated,
  EntityDestroyed,
  PlayerInViewVector,
  EntityInViewVector,
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
  EntityAttacked,
  PlayerAttacked,
  Explosion,
  Death,
  Respawn,
  Piston,
  EffectAdded,
  WeatherUpdated,
  Tick,
]

export { default as AbstractEvent } from './AbstractEvent'
