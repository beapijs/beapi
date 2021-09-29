import { EnableRequest } from './Enable.js'
import { DisableRequest } from './Disable.js'
import { Heartbeat } from './Heartbeat.js'
import { CommandRequest } from './Command.js'
import { PlayerMessage } from './Message.js'
import { PlayerRequest } from './Player.js'
import { UpdateNameTag } from './UpdateNameTag.js'
import { EntityCreate } from './EntityCreate.js'
import { EntityDestroyed } from './EntityDestroyed.js'
import { EntityRequest } from './EntityRequest.js'
import { UpdateEntity } from './UpdateEntity.js'

export const defaultRequests = [
  EnableRequest,
  DisableRequest,
  Heartbeat,
  CommandRequest,
  PlayerMessage,
  PlayerRequest,
  UpdateNameTag,
  EntityCreate,
  EntityDestroyed,
  EntityRequest,
  UpdateEntity,
]
