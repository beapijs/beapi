import { Player } from '../player/player.d'

export interface eventManager {
  events: Map<string, object>
  cancelChat: boolean
  on<K extends keyof eventValues>(event: K, callback: (...args: eventValues[K]) => void): this
  on<S extends symbol>(
    event: Exclude<S, keyof eventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  once<K extends keyof eventValues>(event: K, callback: (...args: eventValues[K]) => void): this
  once<S extends symbol>(
    event: Exclude<S, keyof eventValues>,
    callback: (...args: unknown[]) => void,
  ): this
  emit<K extends keyof eventValues>(event: K, ...args: eventValues[K]): boolean
  emit<S extends symbol>(
    event: Exclude<S, keyof eventValues>,
    ...args: unknown[]
  ): boolean
}

interface eventValues {
  tick: [number]
  PlayerJoined: [Player]
  PlayerLeft: [Player]
  PlayerMessage: [PlayerMessage]
  CommandExecuted: [PlayerMessage]
  PlayerExecutedCommand: [PlayerExecutedCommand]
  NameTagChanged: [NameTagChanged]
}

interface PlayerExecutedCommand {
  sender: Player
  command: string
  args: Array<string>
}

interface PlayerMessage {
  sender: Player
  message: string
}

interface NameTagChanged {
  target: Player
  old: string
  new: string
}