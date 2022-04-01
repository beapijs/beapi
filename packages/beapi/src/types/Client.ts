import type { Player } from '../player'
import type { Entity } from '../entity'
import type { CommandEntry } from '.'
import type {
  BlockLocation,
  BlockPermutation,
  Dimension as IDimension,
  BlockPistonComponent,
  Effect,
  DefinitionModifier,
} from 'mojang-minecraft'
import type { Objective } from './Scoreboards'
import type { ActionForm, MessageForm, ModalForm } from '../forms'
import type { ActionFormResponse, MessageFormResponse, ModalFormResponse } from './Forms'
import type { events } from '../events'
import type { Block } from '../block'
import type { Item } from '../item'

/**
 * Helper type that converts types in an array into a union
 */
export type ArrayItemType<T extends Array<any>> = T extends Array<infer I> ? I : any

/**
 * Custom Client Options.
 */
export interface ClientOptions {
  /**
   * If defined client will only enable events defined
   * in array. (Or none if empty array).
   *  ___
   * ** WARNING
   *
   * This can be very breaking. Certain events control
   * the filling/revoking of certain objects in BeAPI.
   *
   * For example if you dont enable `OnJoin` and `OnLeave`
   * then no players will ever be added to the players map in
   * `Client.players` this means any events that use a player
   * object could error out because it was expected to exist.
   *
   * @todo Make this more safe to utilize in the future.
   *
   * Take a look at [packages/beapi/src/events](https://github.com/MCBE-Utilities/BeAPI/tree/beta/packages/beapi/src/events)
   * to see all events and what they need to work properly.
   */
  enableEvents?: ArrayItemType<typeof events>['prototype']['name'][]
  commandsDisabled?: boolean
  commandsPrefix?: string
}

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
  PlayerTagsUpdated: [PlayerTagsUpdatedEvent]
  EntityTagsUpdated: [EntityTagsUpdatedEvent]
  EntityHurt: [EntityHurtEvent]
  PlayerHurt: [PlayerHurtEvent]
  Lever: [LeverEvent]
  ChestOpened: [ChestOpenedEvent]
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
  item: Item
  cancel: CancelMethod
}

export interface ItemInteractEvent {
  source: Player | Entity | undefined
  item: Item
  block: Block
  blockLocation: BlockLocation
  faceLocationX: number
  faceLocationY: number
  cancel: CancelMethod
}

export interface ItemEventEvent {
  player: Player
  item: Item
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
  tool: Item | undefined
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
  attacker: Player | Entity | undefined
  weapon: Item | undefined
}

export interface PlayerHitEvent {
  target: Player
  attacker: Player | Entity | undefined
  weapon: Item | undefined
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
  command: CommandEntry<never> | undefined
  cancel: CancelMethod
}

export interface CommandUsedEvent {
  command: CommandEntry<never> | undefined
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
  item: Item
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

export interface PlayerTagsUpdatedEvent {
  player: Player
  tag: string
  method: 'remove' | 'add'
  cancel: CancelMethod
}

export interface EntityTagsUpdatedEvent {
  entity: Entity
  tag: string
  method: 'remove' | 'add'
  cancel: CancelMethod
}

export interface EntityHurtEvent {
  target: Entity
  attacker: Player | Entity | undefined
  weapon: Item | undefined
  cause: string
  damage: number
  projectile?: Entity | undefined
}

export interface PlayerHurtEvent {
  target: Player
  attacker: Player | Entity | undefined
  weapon: Item | undefined
  cause: string
  damage: number
  projectile?: Entity | undefined
}

export interface LeverEvent {
  block: Block
  dimension: IDimension
  powered: boolean
  cancel: CancelMethod
}

export interface ChestOpenedEvent {
  block: Block
  player: Player
  type: string
  cancel: CancelMethod
}

export type CancelMethod = () => void
