import type { Player } from '../player'
import type { Entity } from '../entity'
import type { CommandEntry } from './Command'
import type {
  Block,
  BlockLocation,
  BlockPermutation,
  Dimension as IDimension,
  ItemStack,
  BlockPistonComponent,
  Effect,
  DefinitionModifier,
} from 'mojang-minecraft'
import type { Objective } from './Scoreboards'
import type { ActionForm, MessageForm, ModalForm } from '../forms'
import type { ActionFormResponse, MessageFormResponse, ModalFormResponse } from './Forms'

export interface ClientEvents {
  OnChat: [OnChatEvent]
  OnJoin: [Player]
  OnLeave: [Player]
  Tick: [TickEvent]
  ItemUse: [ItemUseEvent]
  ItemInteract: [ItemInteractEvent]
  ItemEvent: [ItemEventEvent]
  ItemDropped: [ItemDroppedEvent]
  EntityDestroyed: [Entity]
  EntityCreated: [Entity]
  BlockDestroyed: [BlockDestroyedEvent]
  BlockCreated: [BlockCreatedEvent]
  BlockHit: [BlockHitEvent]
  PlayerInViewVector: [PlayerInViewVectorEvent]
  EntityInViewVector: [EntityInViewVectorEvent]
  PlayerTag: [PlayerTagEvent]
  EntityTag: [EntityTagEvent]
  EnteredWater: [Player]
  ExitedWater: [Player]
  StartedBurning: [Player]
  StoppedBurning: [Player]
  Jump: [Player]
  Landed: [Player]
  Explosion: [ExplosionEvent]
  StartedMoving: [Player]
  StoppedMoving: [Player]
  StartedRiding: [Player]
  StoppedRiding: [Player]
  StartedSleeping: [Player]
  StoppedSleeping: [Player]
  StartedSneaking: [Player]
  StoppedSneaking: [Player]
  StartedSprinting: [Player]
  StoppedSprinting: [Player]
  StartedSwimming: [Player]
  StoppedSwimming: [Player]
  Swing: [Player]
  Death: [Player]
  Respawn: [Player]
  EntityHit: [EntityHitEvent]
  PlayerHit: [PlayerHitEvent]
  Piston: [PistonEvent]
  EffectAdded: [EffectAddedEvent]
  WeatherUpdated: [WeatherUpdatedEvent]
  CommandRegistered: [CommandRegisteredEvent]
  CommandUsed: [CommandUsedEvent]
  EntityEventTrigger: [EntityEventTriggerEvent]
  PlayerEventTrigger: [PlayerEventTriggerEvent]
  ItemEventTrigger: [ItemEventTriggerEvent]
  PlayerScoreUpdated: [PlayerScoreUpdatedEvent]
  EntityScoreUpdated: [EntityScoreUpdatedEvent]
  ActionFormCreated: [ActionFormCreatedEvent]
  MessageFormCreated: [MessageFormCreatedEvent]
  ModalFormCreated: [ModalFormCreatedEvent]
}

export interface OnChatEvent {
  sender: Player | undefined
  message: string
  cancel: CancelMethod
}

export interface TickEvent {
  currentTick: number
  deltaTime: number
}

export interface ItemUseEvent {
  source: Player | Entity | undefined
  item: ItemStack
  cancel: CancelMethod
}

export interface ItemInteractEvent {
  source: Player | Entity | undefined
  item: ItemStack
  block: Block
  blockLocation: BlockLocation
  faceLocationX: number
  faceLocationY: number
  cancel: CancelMethod
}

export interface ItemEventEvent {
  player: Player
  item: ItemStack
  event: string
  cancel: CancelMethod
}

export interface ItemDroppedEvent {
  player: Player
  item: Entity
}

export interface BlockDestroyedEvent {
  player: Player
  block: Block
  brokenBlock: BlockPermutation
  dimension: IDimension
  cancel: CancelMethod
}

export interface BlockCreatedEvent {
  player: Player
  block: Block
  dimension: IDimension
  cancel: CancelMethod
}

export interface BlockHitEvent {
  player: Player
  block: Block
  tool: ItemStack | undefined
}

export interface PlayerInViewVectorEvent {
  target: Player
  player: Player
}

export interface EntityInViewVectorEvent {
  target: Entity
  player: Player
}

export interface PlayerTagEvent {
  player: Player
  tag: string
}

export interface EntityTagEvent {
  entity: Entity
  tag: string
}

export interface ExplosionEvent {
  source: Entity | undefined
  dimension: IDimension
  impactedBlocks: BlockLocation[]
  cancel: CancelMethod
}

export interface EntityHitEvent {
  target: Entity
  attacker: Player
  weapon: ItemStack | undefined
}

export interface PlayerHitEvent {
  target: Player
  attacker: Player
  weapon: ItemStack | undefined
}

export interface PistonEvent {
  block: Block
  dimension: IDimension
  extending: boolean
  piston: BlockPistonComponent
  cancel: CancelMethod
}

export interface EffectAddedEvent {
  target: Player | Entity | undefined
  state: number
  effect: Effect
}

export interface WeatherUpdatedEvent {
  lightning: boolean
  raining: boolean
  dimension: IDimension
}

export interface CommandRegisteredEvent {
  command: CommandEntry | undefined
  cancel: CancelMethod
}

export interface CommandUsedEvent {
  command: CommandEntry | undefined
  sender: Player | undefined
  args: string[]
  cancel: CancelMethod
}

export interface EntityEventTriggerEvent {
  entity: Entity
  event: string
  data: DefinitionModifier[]
  cancel: CancelMethod
}

export interface PlayerEventTriggerEvent {
  player: Player
  event: string
  data: DefinitionModifier[]
  cancel: CancelMethod
}

export interface ItemEventTriggerEvent {
  source: Player | Entity
  event: string
  item: ItemStack
  cancel: CancelMethod
}

export interface PlayerScoreUpdatedEvent {
  player: Player
  objective: Objective
  value: number
  old: number
  cancel: CancelMethod
}

export interface EntityScoreUpdatedEvent {
  entity: Entity
  objective: Objective
  value: number
  old: number
  cancel: CancelMethod
}

export interface ActionFormCreatedEvent {
  player: Player
  form: ActionForm
  result: (callback: (data: ActionFormResponse) => void) => void
  cancel: CancelMethod
}

export interface MessageFormCreatedEvent {
  player: Player
  form: MessageForm
  result: (callback: (data: MessageFormResponse) => void) => void
  cancel: CancelMethod
}

export interface ModalFormCreatedEvent {
  player: Player
  form: ModalForm
  result: (callback: (data: ModalFormResponse) => void) => void
  cancel: CancelMethod
}

export type CancelMethod = () => void
