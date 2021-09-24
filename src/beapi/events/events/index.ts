import { Tick } from "./tick.js"
import { PlayerJoin } from "./PlayerJoin.js"
import { PlayerLeft } from "./PlayerLeft.js"
import { PlayerMessage } from "./PlayerMessage.js"
import { EntityCreate } from './EntityCreate.js'

export const defaultEvents = [
  Tick,
  PlayerJoin,
  PlayerLeft,
  PlayerMessage,
  EntityCreate,
]
