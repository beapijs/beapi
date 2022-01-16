import { OnChat } from './OnChat'
import { OnJoin } from './OnJoin'
import { OnLeave } from './OnLeave'
import { BlockCreated } from './BlockCreated'
import { BlockDestroyed } from './BlockDestroyed'
import { ItemUse } from './ItemUse'
import { ItemInteract } from './ItemInteract'
import { EntityCreated } from './EntityCreated'
import { EntityDestroyed } from './EntityDestroyed'
import { PlayerInViewVector } from './PlayerInViewVector'
import { EntityInViewVector } from './EntityInViewVector'
import { PlayerTag } from './PlayerTag'
import { EntityTag } from './EntityTag'
import { EnteredWater } from './EnteredWater'
import { ExitedWater } from './ExitedWater'
import { StartedBurning } from './StartedBurning'
import { StoppedBurning } from './StoppedBurning'
import { Jump } from './Jump'
import { Landed } from './Landed'
import { StartedMoving } from './StartedMoving'
import { StoppedMoving } from './StoppedMoving'
import { StartedRiding } from './StartedRiding'
import { StoppedRiding } from './StoppedRiding'
import { StartedSleeping } from './StartedSleeping'
import { StoppedSleeping } from './StoppedSleeping'
import { StartedSneaking } from './StartedSneaking'
import { StoppedSneaking } from './StoppedSneaking'
import { StartedSprinting } from './StartedSprinting'
import { Tick } from './Tick'

export const events = [
  OnChat,
  OnJoin,
  OnLeave,
  BlockCreated,
  BlockDestroyed,
  ItemUse,
  ItemInteract,
  EntityCreated,
  EntityDestroyed,
  PlayerInViewVector,
  EntityInViewVector,
  PlayerTag,
  EntityTag,
  EnteredWater,
  ExitedWater,
  StartedBurning,
  StoppedBurning,
  Jump,
  Landed,
  StartedMoving,
  StoppedMoving,
  StartedRiding,
  StoppedRiding,
  StartedSleeping,
  StoppedSleeping,
  StartedSneaking,
  StoppedSneaking,
  StartedSprinting,
  Tick,
]

export { default as AbstractEvent } from './AbstractEvent'
