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
import { InventoryRequest } from './Inventory.js'
import { ToggleCommands } from './ToggleCommands.js'
import { ToggleMessages } from './ToggleMessages.js'
import { GetRequests } from './requests.js'

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
]
