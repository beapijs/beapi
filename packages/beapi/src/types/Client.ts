// Type imports.
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
  /**
   * Whether commands should be enabled or not.
   */
  commandsDisabled?: boolean
  /**
   * Set command handler prefix.
   */
  commandsPrefix?: string
}

/**
 * All BeAPI client events.
 */
export interface ClientEvents {
  /**
   * Emitted when a message is sent in chat.
   */
  OnChat: [OnChatEvent]
  /**
   * Emitted when a player joins the world.
   */
  OnJoin: [Player]
  /**
   * Emitted when a player leaves the world.
   */
  OnLeave: [Player]
  /**
   * Emitted on every server tick iteration.
   */
  Tick: [TickEvent]
  /**
   * Emitted on an item being used.
   */
  ItemUse: [ItemUseEvent]
  /**
   * Emitted when an item is interacted with.
   */
  ItemInteract: [ItemInteractEvent]
  /**
   * Emitted on an item component event.
   */
  ItemEvent: [ItemEventEvent]
  /**
   * Emitted on an item dropped.
   */
  ItemDropped: [ItemDroppedEvent]
  /**
   * Emitted when an entity is removed/killed.
   */
  EntityDestroyed: [Entity]
  /**
   * Emitted when an entity is created/spawned.
   */
  EntityCreated: [Entity]
  /**
   * Emitted when a block is destroyed/broken.
   */
  BlockDestroyed: [BlockDestroyedEvent]
  /**
   * Emitted when a block is created/placed.
   */
  BlockCreated: [BlockCreatedEvent]
  /**
   * Emitted when a block is hit (not broken).
   */
  BlockHit: [BlockHitEvent]
  /**
   * Emitted when a player is in the view vector of another player.
   */
  PlayerInViewVector: [PlayerInViewVectorEvent]
  /**
   * Emitted when an entity is in a players view vector.
   */
  EntityInViewVector: [EntityInViewVectorEvent]
  /**
   * Emitted when a tag is added to a player prefixed with `beapi:`
   */
  PlayerTag: [PlayerTagEvent]
  /**
   * Emitted when a tag is added to an entity prefixed with `beapi:`
   */
  EntityTag: [EntityTagEvent]
  /**
   * Emitted when a player enters water.
   */
  EnteredWater: [Player]
  /**
   * Emitted when a player exits water.
   */
  ExitedWater: [Player]
  /**
   * Emitted when a player starts burning.
   */
  StartedBurning: [Player]
  /**
   * Emitted when a player stops burning.
   */
  StoppedBurning: [Player]
  /**
   * Emitted when a player jumps.
   */
  Jump: [Player]
  /**
   * Emitted when a player lands.
   */
  Landed: [Player]
  /**
   * Emitted when an explosion occurs.
   */
  Explosion: [ExplosionEvent]
  /**
   * Emitted when a player starts moving.
   */
  StartedMoving: [Player]
  /**
   * Emitted when a player stops moving.
   */
  StoppedMoving: [Player]
  /**
   * Emitted when a player starts riding.
   */
  StartedRiding: [Player]
  /**
   * Emitted when a player stop riding.
   */
  StoppedRiding: [Player]
  /**
   * Emitted when a player starts sleeping.
   */
  StartedSleeping: [Player]
  /**
   * Emitted when a player stops sleeping.
   */
  StoppedSleeping: [Player]
  /**
   * Emitted when a player starts sneaking.
   */
  StartedSneaking: [Player]
  /**
   * Emitted when a player stops sneaking.
   */
  StoppedSneaking: [Player]
  /**
   * Emitted when a player starts sprinting.
   */
  StartedSprinting: [Player]
  /**
   * Emitted when a player stops sprinting.
   */
  StoppedSprinting: [Player]
  /**
   * Emitted when a player starts swimming.
   */
  StartedSwimming: [Player]
  /**
   * Emitted when a player stop swimming.
   */
  StoppedSwimming: [Player]
  /**
   * Emits when a player swings their arm.
   */
  Swing: [Player]
  /**
   * Emitted when a player dies.
   */
  Death: [Player]
  /**
   * Emitted when a player respawns
   */
  Respawn: [Player]
  /**
   * Emitted when an entity is hit.
   */
  EntityHit: [EntityHitEvent]
  /**
   * Emitted when a player is hit.
   */
  PlayerHit: [PlayerHitEvent]
  /**
   * Emitted when a piston does something.
   */
  Piston: [PistonEvent]
  /**
   * Emitted when an effect is added to an actor.
   */
  EffectAdded: [EffectAddedEvent]
  /**
   * Emitted when the weather is updated.
   */
  WeatherUpdated: [WeatherUpdatedEvent]
  /**
   * Emitted when a BeAPI command is registed.
   */
  CommandRegistered: [CommandRegisteredEvent]
  /**
   * Emitted when a BeAPI command is used.
   */
  CommandUsed: [CommandUsedEvent]
  /**
   * Emitted on an entity component trigger event.
   */
  EntityEventTrigger: [EntityEventTriggerEvent]
  /**
   * Emitted on an player component trigger event.
   */
  PlayerEventTrigger: [PlayerEventTriggerEvent]
  /**
   * Emitted on an item component trigger event.
   */
  ItemEventTrigger: [ItemEventTriggerEvent]
  /**
   * Emitted on a players score updated.
   */
  PlayerScoreUpdated: [PlayerScoreUpdatedEvent]
  /**
   * Emitted on an entities score updated.
   */
  EntityScoreUpdated: [EntityScoreUpdatedEvent]
  /**
   * Emitted on an action form being created.
   */
  ActionFormCreated: [ActionFormCreatedEvent]
  /**
   * Emitted on a message form created.
   */
  MessageFormCreated: [MessageFormCreatedEvent]
  /**
   * Emitted on a modal form created.
   */
  ModalFormCreated: [ModalFormCreatedEvent]
  /**
   * Emitted when a players tags are updated.
   */
  PlayerTagsUpdated: [PlayerTagsUpdatedEvent]
  /**
   * Emitted when an entities tags are updated.
   */
  EntityTagsUpdated: [EntityTagsUpdatedEvent]
  /**
   * Emitted when an entity is hurt.
   */
  EntityHurt: [EntityHurtEvent]
  /**
   * Emitted when a player us hurt.
   */
  PlayerHurt: [PlayerHurtEvent]
  /**
   * Emitted when a level is flicked.
   */
  Lever: [LeverEvent]
  /**
   * Emitted when a chest is opened.
   */
  ChestOpened: [ChestOpenedEvent]
}

/**
 * Chat event trigger data.
 */
export interface OnChatEvent {
  /**
   * Player who sent the message.
   */
  sender: Player | undefined
  /**
   * Message content.
   */
  message: string
  /**
   * Stop event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Server tick iteration event data,
 */
export interface TickEvent {
  /**
   * Current tick number. Always increases.
   */
  currentTick: number
  /**
   * Time difference in between last and current ticked events played.
   */
  deltaTime: number
}

/**
 * Item used trigger data.
 */
export interface ItemUseEvent {
  /**
   * The player or entity or possibly nothing that used the item.
   */
  source: Player | Entity | undefined
  /**
   * The item in question.
   */
  item: Item
  /**
   * Stop event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Item interaction trigger data.
 */
export interface ItemInteractEvent {
  /**
   * The player or entity or possibly nothing that interacted the item.
   */
  source: Player | Entity | undefined
  /**
   * The item in question.
   */
  item: Item
  /**
   * The block interacted with.
   */
  block: Block
  /**
   * Location of the interaction.
   */
  blockLocation: BlockLocation
  /**
   * Face location direction X.
   */
  faceLocationX: number
  /**
   * Face location direction Y.
   */
  faceLocationY: number
  /**
   * Stop the event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Item event event trigger data.
 */
export interface ItemEventEvent {
  /**
   * Player triggering the event.
   */
  player: Player
  /**
   * The item in question.
   */
  item: Item
  /**
   * Event that occured on item.
   */
  event: string
  /**
   * Stop the event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Item dropping trigger data.
 */
export interface ItemDroppedEvent {
  /**
   * Player who dropped item.
   */
  player: Player
  /**
   * Item (which is now an entity because its on the ground).
   */
  item: Entity
}

/**
 * Block destroyed event trigger data.
 */
export interface BlockDestroyedEvent {
  /**
   * Player who broke the block.
   */
  player: Player
  /**
   * The block broken.
   */
  block: Block
  /**
   * The broken blocks permutation state.
   */
  brokenBlock: BlockPermutation
  /**
   * Dimension event occured in.
   */
  dimension: IDimension
  /**
   * Stop event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Block created event trigger data.
 */
export interface BlockCreatedEvent {
  /**
   * Player who placed the block.
   */
  player: Player
  /**
   * Block that was placed.
   */
  block: Block
  /**
   * Dimension event occured in.
   */
  dimension: IDimension
  /**
   * Stop event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Block hit event trigger data.
 */
export interface BlockHitEvent {
  /**
   * Player who punched the block.
   */
  player: Player
  /**
   * Block that was punched.
   */
  block: Block
  /**
   * Item that was used to punch it (or undefined).
   */
  tool: Item | undefined
}

/**
 * Player in Player view vector event trigger data.
 */
export interface PlayerInViewVectorEvent {
  /**
   * Player being peeped.
   */
  target: Player
  /**
   * Player thats peeping.
   */
  player: Player
}

/**
 * Entity in Player view vector event trigger data.
 */
export interface EntityInViewVectorEvent {
  /**
   * Entity being peeped.
   */
  target: Entity
  /**
   * Player thats peeping
   */
  player: Player
}

/**
 * Player BeAPI tag event trigger data.
 */
export interface PlayerTagEvent {
  /**
   * Player whos `beapi` tags changed.
   */
  player: Player
  /**
   * Tag with `beapi:` removed.
   */
  tag: string
}

/**
 * Entity BeAPI tag event trigger data.
 */
export interface EntityTagEvent {
  /**
   * Entity whos `beapi` tags changed.
   */
  entity: Entity
  /**
   * Tag with `beapi:` removed.
   */
  tag: string
}

/**
 * Explosion event trigger data.
 */
export interface ExplosionEvent {
  /**
   * Possible source exposion entity source.
   */
  source: Entity | undefined
  /**
   * Dimension boom occured in.
   */
  dimension: IDimension
  /**
   * Blocks that were boomed.
   */
  impactedBlocks: BlockLocation[]
  /**
   * Stop boom from happening.
   */
  cancel: CancelMethod
}

/**
 * Entity hit event trigger data.
 */
export interface EntityHitEvent {
  /**
   * Entity who was hit.
   */
  target: Entity
  /**
   * Player, Entity, Or Nothing that hit it.
   */
  attacker: Player | Entity | undefined
  /**
   * Weapon used (or undefined).
   */
  weapon: Item | undefined
}

/**
 * Player hit event trigger data.
 */
export interface PlayerHitEvent {
  /**
   * Player who was hit.
   */
  target: Player
  /**
   * Player, Entity, Or Nothing that hit it.
   */
  attacker: Player | Entity | undefined
  /**
   * Weapon used (or undefined).
   */
  weapon: Item | undefined
}

/**
 * Piston did something event trigger.
 */
export interface PistonEvent {
  /**
   * Block affected.
   */
  block: Block
  /**
   * Dimension that event occured in.
   */
  dimension: IDimension
  /**
   * Piston is extending?
   */
  extending: boolean
  /**
   * Piston block component.
   */
  piston: BlockPistonComponent
  /**
   * Stop piston from doing what it do.
   */
  cancel: CancelMethod
}

/**
 * Effect added to actor event trigger data.
 */
export interface EffectAddedEvent {
  /**
   * Player, Entity, Or Nothing that was affected.
   */
  target: Player | Entity | undefined
  /**
   * Effect state int.
   */
  state: number
  /**
   * Effect affecting the target.
   */
  effect: Effect
}

/**
 * Weather updated event trigger data.
 */
export interface WeatherUpdatedEvent {
  /**
   * Light show enabled?
   */
  lightning: boolean
  /**
   * Free water enabled?
   */
  raining: boolean
  /**
   * Dimension it occured in.
   */
  dimension: IDimension
}

/**
 * BeAPI command registered trigger data.
 */
export interface CommandRegisteredEvent {
  /**
   * Command registered.
   */
  command: CommandEntry<never> | undefined
  /**
   * Cancel registery.
   */
  cancel: CancelMethod
}

/**
 * BeAPI command user event trigger data.
 */
export interface CommandUsedEvent {
  /**
   * Command that was used.
   */
  command: CommandEntry<never> | undefined
  /**
   * Player attempting to use command.
   */
  sender: Player | undefined
  /**
   * Arguments from command?
   */
  args: string[]
  /**
   * Cancel the command result.
   */
  cancel: CancelMethod
}

/**
 * Entity component trigger event trigger data.
 */
export interface EntityEventTriggerEvent {
  /**
   * Entity trigger occured on.
   */
  entity: Entity
  /**
   * Event that occured.
   */
  event: string
  /**
   * Event data.
   */
  data: DefinitionModifier[]
  /**
   * Cancel event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Player component trigger event trigger data.
 */
export interface PlayerEventTriggerEvent {
  /**
   * PLayer trigger occured on.
   */
  player: Player
  /**
   * Event that occured.
   */
  event: string
  /**
   * Event data.
   */
  data: DefinitionModifier[]
  /**
   * Cancel event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Item component trigger event trigger data.
 */
export interface ItemEventTriggerEvent {
  /**
   * Player or entity with the item.
   */
  source: Player | Entity
  /**
   * Event that occured.
   */
  event: string
  /**
   * Item that event occured on.
   */
  item: Item
  /**
   * Cancel event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Player score updated event trigger data.
 */
export interface PlayerScoreUpdatedEvent {
  /**
   * Player whos score changed.
   */
  player: Player
  /**
   * Object the score changed on.
   */
  objective: Objective
  /**
   * Current score value.
   */
  value: number
  /**
   * Old score value.
   */
  old: number
  /**
   * Cancel event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Entity score updated event trigger data.
 */
export interface EntityScoreUpdatedEvent {
  /**
   * Entity whos score changed.
   */
  entity: Entity
  /**
   * Object the score changed on.
   */
  objective: Objective
  /**
   * Current score value.
   */
  value: number
  /**
   * Old score value.
   */
  old: number
  /**
   * Cancel event from occuring.
   */
  cancel: CancelMethod
}

/**
 * Action form created event trigger data.
 */
export interface ActionFormCreatedEvent {
  /**
   * Player is sending to.
   */
  player: Player
  /**
   * Action Form data.
   */
  form: ActionForm
  /**
   * Result data callback.
   */
  result: (callback: (data: ActionFormResponse) => void) => void
  /**
   * Cancel the form from being sent.
   */
  cancel: CancelMethod
}

/**
 * Message form created event trigger data.
 */
export interface MessageFormCreatedEvent {
  /**
   * Player is sending to.
   */
  player: Player
  /**
   * Message form data.
   */
  form: MessageForm
  /**
   * Result data callback.
   */
  result: (callback: (data: MessageFormResponse) => void) => void
  /**
   * Cancel form from being sent.
   */
  cancel: CancelMethod
}

/**
 * Modal form created event trigger data.
 */
export interface ModalFormCreatedEvent {
  /**
   * Player is sending to.
   */
  player: Player
  /**
   * Modal form data.
   */
  form: ModalForm
  /**
   * Result data callback.
   */
  result: (callback: (data: ModalFormResponse) => void) => void
  /**
   * Cancel form from being sent.
   */
  cancel: CancelMethod
}

/**
 * Player tags updated event trigger data.
 *
 * Does NOT include tags prefixed with `beapi:`
 */
export interface PlayerTagsUpdatedEvent {
  /**
   * Player tag update occured on.
   */
  player: Player
  /**
   * Tag string.
   */
  tag: string
  /**
   * Was removed or added?
   */
  method: 'remove' | 'add'
  /**
   * Cancel tag update from occuring.
   */
  cancel: CancelMethod
}

/**
 * Entity tags updated event trigger data.
 *
 * Does NOT include tags prefixed with `beapi:`
 */
export interface EntityTagsUpdatedEvent {
  /**
   * Entity tag update occured on.
   */
  entity: Entity
  /**
   * Tag string.
   */
  tag: string
  /**
   * Was removed or added?
   */
  method: 'remove' | 'add'
  /**
   * Cancel tag update from occuring.
   */
  cancel: CancelMethod
}

/**
 * Entity hurt event trigger data.
 */
export interface EntityHurtEvent {
  /**
   * Entity that was hurt.
   */
  target: Entity
  /**
   * Player, Entity, or Nothing that attacked.
   */
  attacker: Player | Entity | undefined
  /**
   * Weapon used (or undefined).
   */
  weapon: Item | undefined
  /**
   * What caused the hurt...?
   */
  cause: string
  /**
   * Amount of damage delt.
   */
  damage: number
  /**
   * Projectile that hit them (if one).
   */
  projectile?: Entity | undefined
}

/**
 * Player hurt event trigger data.
 */
export interface PlayerHurtEvent {
  /**
   * Player that got hurt.
   */
  target: Player
  /**
   * Player, Entity, or Nothing that attacked.
   */
  attacker: Player | Entity | undefined
  /**
   * Weapon used (or undefined).
   */
  weapon: Item | undefined
  /**
   * What caused the hurt...?
   */
  cause: string
  /**
   * Amount of damage delt.
   */
  damage: number
  /**
   * Projectile that hit them (if one).
   */
  projectile?: Entity | undefined
}

/**
 * Level flicked event trigger data.
 */
export interface LeverEvent {
  /**
   * Level block.
   */
  block: Block
  /**
   * Dimension it occured in.
   */
  dimension: IDimension
  /**
   * Lever is powered?
   */
  powered: boolean
  /**
   * Cancel level flicked.
   */
  cancel: CancelMethod
}

/**
 * Chest open event trigger data.
 */
export interface ChestOpenedEvent {
  /**
   * Chest block.
   */
  block: Block
  /**
   * Player who opened it.
   */
  player: Player
  /**
   * Chest type.
   */
  type: string
  /**
   * Cancel chest from being opened.
   */
  cancel: CancelMethod
}

/**
 * Noop Cancel Method
 */
export type CancelMethod = () => void
