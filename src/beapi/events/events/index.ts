import { Tick } from "./tick.js"
import { PlayerJoin } from "./PlayerJoin.js"
import { PlayerLeft } from "./PlayerLeft.js"
import { PlayerMessage } from "./PlayerMessage.js"
import { EntityCreate } from './EntityCreate.js'
import { Explosion } from './Explosion.js'
import { OldApi } from './OldApi.js'
import { BlockDestructionStarted } from './BlockDestructionStarted.js'
import { BlockDestructionStopped } from './BlockDestructionStopped.js'
import { BlockDestroyed } from './BlockDestroyed.js'
import { BlockPlaced } from './BlockPlaced.js'
import { EntityAttacked } from './EntityAttacked.js'

export const defaultEvents = [
  Tick,
  PlayerJoin,
  PlayerLeft,
  PlayerMessage,
  EntityCreate,
  Explosion,
  OldApi,
  BlockDestructionStarted,
  BlockDestructionStopped,
  BlockDestroyed,
  BlockPlaced,
  EntityAttacked,
]
