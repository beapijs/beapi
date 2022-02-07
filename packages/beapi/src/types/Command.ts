import type { Player } from '../player'

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
  type: typeof String | typeof Number | typeof Boolean
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
    type: 'string' | 'number' | 'boolean'
  }[]
}

export type CommandResponse = (player: Player | undefined, args?: Map<string, any>) => void
