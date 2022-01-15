import type { Player } from '../player'

export interface CommandOptions {
  name: string
  aliases?: string[]
  description: string
  permissions?: string[]
  hidden?: boolean
}

export interface CommandResponse {
  sender: Player
  args: string[]
}

export interface Command {
  options: CommandOptions
  cb: CommandCallback
}

export type CommandCallback = (data: CommandResponse) => void

export interface ParseResult {
  command: string
  args: string[]
}
