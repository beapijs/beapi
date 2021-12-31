import { Tick } from './tick.js'
import { PlayerJoin } from './PlayerJoin.js'
import { PlayerLeft } from './PlayerLeft.js'
import { PlayerMessage } from './PlayerMessage.js'
import { EntityCreate } from './EntityCreate.js'
import { Explosion } from './Explosion.js'
import { ItemUse } from './ItemUse.js'
import { ItemUseOn } from './ItemUseOn.js'
import { BlockPlaced } from './BlockPlaced.js'
import { BlockDestroyed } from './BlockDestroyed.js'
import { PlayerSwing } from './PlayerSwing.js'
import { PlayerAttacked } from './PlayerAttacked.js'
import { PlayerInViewVector } from './PlayerInViewVector.js'
import { EntityAttacked } from './EntityAttacked.js'
import { EntityInViewVector } from './EntityInViewVector.js'
import { PlayerSleep } from './PlayerSleep.js'
import { PlayerWake } from './PlayerWake.js'
import { PlayerSneak } from './PlayerSneak.js'
import { PlayerUnsneak } from './PlayerUnsneak.js'
import { PlayerJump } from './PlayerJump.js'
import { PlayerLanded } from './PlayerLanded.js'
import { PlayerInWater } from './PlayerInWater.js'
import { PlayerExitWater } from './PlayerExitWater.js'
import { PlayerOnFire } from './PlayerOnFire.js'
import { PlayerOffFire } from './PlayerOffFire.js'
import { PlayerIsMoving } from './PlayerIsMoving.js'
import { PlayerStoppedMoving } from './PlayerStoppedMoving.js'
import { PlayerIsRiding } from './PlayerIsRiding.js'
import { PlayerStoppedRiding } from './PlayerStoppedRiding.js'

export const defaultEvents = [
  Tick,
  PlayerJoin,
  PlayerLeft,
  PlayerMessage,
  EntityCreate,
  Explosion,
  ItemUse,
  ItemUseOn,
  BlockPlaced,
  BlockDestroyed,
  PlayerSwing,
  PlayerAttacked,
  PlayerInViewVector,
  EntityAttacked,
  EntityInViewVector,
  PlayerSleep,
  PlayerWake,
  PlayerSneak,
  PlayerUnsneak,
  PlayerJump,
  PlayerLanded,
  PlayerInWater,
  PlayerExitWater,
  PlayerOnFire,
  PlayerOffFire,
  PlayerIsMoving,
  PlayerStoppedMoving,
  PlayerIsRiding,
  PlayerStoppedRiding,
]
