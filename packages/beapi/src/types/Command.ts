import type { Player } from '../player'
import type { CommandTypes } from '../commands'

export interface CommandOptions {
  name: string
  usage: string
  description: string
  aliases?: string[]
  hidden?: boolean
}

export interface CommandArguments {
  name: string
  required: boolean
  type: typeof CommandTypes[keyof typeof CommandTypes]
}

export interface CommandEntry {
  id: string
  options: CommandOptions
  args?: CommandArguments[] | undefined
  execute: CommandResponse
}

export interface ParseResult {
  command: string | undefined
  args?: {
    value: any
    type: typeof CommandTypes[keyof typeof CommandTypes]
  }[]
}

export type CommandResponse = (player: Player | undefined, args?: Map<string, any>) => void
