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
  Tick,
]

export { default as AbstractEvent } from './AbstractEvent'
