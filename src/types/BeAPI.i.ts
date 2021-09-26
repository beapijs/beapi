import {
  BlockLocation,
  Dimension,
  Entity as MCEntity,
} from "mojang-minecraft"
import { Player } from "../beapi/player/Player"
import { Entity } from "../beapi/entity/Entity"

export interface Location {
  x: number
  y: number
  z: number
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
  Explosion: [Explosion]
}

interface Explosion {
  dimension: Dimension
  source: MCEntity
  impactedBlocks: BlockLocation[]
}

interface NameTagChanged {
  player: Player
  old: string
  new: string
}

interface PlayerMessage {
  sender: Player
  message: string
  cancelEvent(cancel: boolean): void
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

export interface CommandOptions {
  command: string
  aliases?: string[]
  description: string
  permissionTags?: string[]
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
}

export type Demensions = (
  "overworld" |
  "nether" |
  "the end"
)
