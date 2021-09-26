import { EnableRequest } from './enable.js'
import { DisableRequest } from './disable.js'
import { Heartbeat } from './heartbeat.js'
import { CommandRequest } from './command.js'
import { PlayerMessage } from './message.js'
import { PlayerRequest } from './player.js'
import { UpdateNameTag } from './updateNameTag.js'
import { EntityCreate } from './entityCreate.js'

export const defaultRequests = [
  EnableRequest,
  DisableRequest,
  Heartbeat,
  CommandRequest,
  PlayerMessage,
  PlayerRequest,
  UpdateNameTag,
  EntityCreate,
]
