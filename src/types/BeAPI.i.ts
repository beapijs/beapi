import { Player } from "../beapi/player/Player"

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
  RawSocketMessage: [RawSocketMessage]
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
  command?: string
  entityId?: string
  entities?: any
  message?: string
  data?: any
  requestId: string
}
