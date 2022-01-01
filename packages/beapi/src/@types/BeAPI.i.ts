import type {
  Block,
  BlockLocation,
  Container,
  Dimension,
  Entity as MCEntity,
  ItemStack,
  Player as MCPlayer,
} from 'mojang-minecraft'
import type { Player } from '../player/Player'
import type { Entity } from '../entity/Entity'

export interface Location {
  x: number
  y: number
  z: number
  dimension?: Dimension
}

export interface EventValues {
  tick: [number]
  PlayerJoin: [Player]
  PlayerLeft: [Player]
  PlayerMessage: [PlayerMessage]
  ChatCommand: [ChatCommand]
  RawSocketMessage: [RawSocketMessage]
  NameTagChanged: [NameTagChanged]
  EntityCreate: [Entity]
  EntityDestroyed: [Entity]
  Explosion: [Explosion]
  ItemUse: [ItemUse]
  ItemUseOn: [ItemUseOn]
  BlockPlaced: [BlockPlaced]
  BlockDestroyed: [BlockDestroyed]
  PlayerSwing: [Player]
  PlayerAttacked: [PlayerAttacked]
  PlayerInViewVector: [PlayerInViewVector]
  EntityAttacked: [EntityAttacked]
  EntityInViewVector: [EntityInViewVector]
  PlayerSleep: [Player]
  PlayerWake: [Player]
  PlayerSneak: [Player]
  PlayerUnsneak: [Player]
  PlayerJump: [Player]
  PlayerLanded: [Player]
  PlayerInWater: [Player]
  PlayerExitWater: [Player]
  PlayerOnFire: [Player]
  PlayerOffFire: [Player]
  PlayerIsMoving: [Player]
  PlayerStoppedMoving: [Player]
  PlayerIsRiding: [Player]
  PlayerStoppedRiding: [Player]
  PlayerIsSprinting: [Player]
  PlayerStoppedSprinting: [Player]
  PlayerIsSwimming: [Player]
  PlayerStoppedSwimming: [Player]
}

interface EntityInViewVector {
  player: Player
  target: Entity
}
interface EntityAttacked {
  attacker: Player
  target: Entity
}

interface PlayerInViewVector {
  player: Player
  target: Player
}
interface PlayerAttacked {
  attacker: Player
  target: Player
}

interface BlockDestroyed {
  player: Player
  block: Block
  cancelEvent(): void
}

interface BlockPlaced {
  player: Player
  block: Block
  cancelEvent(): void
}

interface ItemUse {
  source: Player | Entity
  item: ItemStack
  cancelEvent(): void
}

interface ItemUseOn {
  source: Player | Entity
  item: ItemStack
  block: Block
  cancelEvent(): void
}

interface Explosion {
  dimension: Dimension
  source: MCEntity
  impactedBlocks: BlockLocation[]
}

export interface NameTagChanged {
  player: Player
  old: string
  new: string
}

interface PlayerMessage {
  sender: Player
  message: string
  cancelEvent(): void
}

interface RawSocketMessage {
  sender: Player
  message: string
}

export interface Interval {
  callback: CallableFunction
  tick: number
}

export interface JsonRequest {
  berp: JsonData
}

interface JsonData {
  event?: string
  sender?: any
  player?: any
  entity?: any
  command?: string
  entityId?: string
  entities?: any
  message?: string
  data?: any
  requestId: string
}

export interface CommandManagerOptions {
  id: string
  prefix: string
  color?: string
}

export interface CommandOptions {
  command: string
  aliases?: string[]
  description: string
  permissionTags?: string[]
  showInList?: boolean
}

export interface CommandMapOptions {
  options: CommandOptions
  showInList: boolean
  execute(data: CommandResponse): void
}

export interface CommandResponse {
  sender: Player
  args: string[]
}

export interface ChatCommand {
  sender: Player
  command: string
  managerId: string
}

export type Dimensions = 'overworld' | 'nether' | 'the end'

export interface Inventory {
  readonly emptySlotsCount: number
  readonly size: number
  addItem(itemStack: ItemStack): void
  getItem(slot: number): ItemStack
  setItem(slot: number, itemStack: ItemStack): void
  swapItems(slot: number, otherSlot: number, otherContainer: Container): boolean
  transferItem(fromSlot: number, toSlot: number, toContainer: Container): boolean
}

export interface ExecuteCommandResponse {
  statusMessage?: any
  data?: any
  err?: any
}

export interface Health {
  current: number
  max: number
}

export interface db {
  database: {
    name: string
    id: number
    entries: entry[]
  }
}

export interface entry {
  name: string
  value: any
  type?: string
  string?: string
}

export interface BlockEvent {
  // TEMP: Remove once docs are updated.
  readonly block: Block
  readonly dimension: Dimension
  readonly player: MCPlayer
}

export type Gamemodes = 'creative' | 'adventure' | 'survival' | 'unknown'
