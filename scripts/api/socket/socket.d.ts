import { Player } from '../player/player'

export interface socketManager {
  sendMessage(message: string): void
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
  Message: [SocketMessage]
}

interface SocketMessage {
  sender: Player
  data: string
}