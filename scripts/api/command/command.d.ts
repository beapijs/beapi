import { Player } from "../player/player.d"

export interface commandManager {
  setPrefix(prefix: string): void
  enable(): void
  registerCommand(options: commandOptions, Callback:(data: commandResponse) => void): void
}

interface command {
  options: commandOptions,
  showInList: boolean
  execute(data: commandResponse): void
}

interface commandResponse {
  sender: Player
  args: Array<string>
}

interface commandOptions {
  command: string
  aliases?: Array<string>
  description: string
  permissionTags?: Array<string>
}