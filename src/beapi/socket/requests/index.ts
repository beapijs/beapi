import { EnableRequest } from './EnableRequest.js'
import { DisableRequest } from './DisableRequest.js'
import { Heartbeat } from './Heartbeat.js'
import { CommandRequest } from './CommandRequest.js'
import { PlayerMessage } from './PlayerMessage.js'
import { PlayerRequest } from './PlayerRequest.js'
import { UpdateNameTag } from './UpdateNameTag.js'
import { EntityCreate } from './EntityCreate.js'
import { EntityDestroyed } from './EntityDestroyed.js'
import { EntityRequest } from './EntityRequest.js'
import { UpdateEntity } from './UpdateEntity.js'
import { InventoryRequest } from './InventoryRequest.js'
import { ToggleCommands } from './ToggleCommands.js'
import { ToggleMessages } from './ToggleMessages.js'
import { GetRequests } from './GetRequests.js'
import { TagsRequest } from './TagsRequest.js'
import { GetPlayers } from './GetPlayers.js'
import { GetEntities } from './GetEntities.js'
import { ScoreRequest } from './ScoreRequest.js'
import { Explosion } from './Explosion.js'

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
  InventoryRequest,
  ToggleCommands,
  ToggleMessages,
  GetRequests,
  TagsRequest,
  GetPlayers,
  GetEntities,
  ScoreRequest,
  Explosion,
]
