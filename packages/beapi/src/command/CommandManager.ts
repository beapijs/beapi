/* eslint-disable prettier/prettier */
import { events } from '../events/EventManager.js'
import { mcbe, version } from '../version.js'
import type { CommandManagerOptions, CommandMapOptions, CommandResponse, CommandOptions, ChatCommand, JsonRequest } from '../@types/BeAPI.i'
import { socket } from '../socket/SocketManager.js'

const managers = new Map<string, CommandManager>()
export class CommandManager {
  private readonly _id: string
  private _prefix: string
  private readonly _color: string
  private readonly _commands = new Map<string, CommandMapOptions>()
  public enabled = true

  public constructor(options: CommandManagerOptions) {
    this._id = options.id
    this._prefix = options.prefix ?? '-'
    this._color = options.color ?? '§b'
    for (const [, manager] of managers) {
      if (manager.getPrefix() !== this._prefix) continue

      return console.warn(`[CommandManager] Failed to Register: A manager already exists with the prefix ${this._prefix}`) as any
    }
    if (managers.has(this._id)) return console.warn(`[CommandManager] Failed to Register: A manager already exists with the id ${this._id}`) as any
    managers.set(this._id, this)
    this._defaultCommands()
    events.on('ChatCommand', (data) => {
      if (data.managerId !== this._id) return
      this.executeCommand(data)
    })
  }

  private _defaultCommands(): void {
    this.registerCommand(
      {
        command: 'help',
        description: `Displays a list of available commands.`,
        aliases: ['h'],
      },
      (data) => {
        data.sender.sendMessage(`${this._color}Showing all Available Commands:`)
        this.getCommands().forEach((command) => {
          if (!command.showInList) return
          data.sender.sendMessage(
            ` §7${this.getPrefix()}${command.options.command}§r §o§8- ${command.options.description}§r`,
          )
        })
      },
    )
  }

  private _parseCommand(content: string): { command: string; args: string[] } {
    const command = content.replace(this._prefix, '').split(' ')[0]
    const args = content.replace(`${this._prefix}${command} `, '').split(' ')
    if (args[0] === `${this._prefix}${command}`) args.shift()

    return {
      command: command,
      args: args,
    }
  }

  private executeCommand(data: ChatCommand): void {
    const parsedCommand = this._parseCommand(data.command)
    if (!this._commands.has(parsedCommand.command)) return data.sender.sendMessage("§cThis command doesn't exsist!")
    const commandData = this._commands.get(parsedCommand.command)
    if (!commandData?.options.permissionTags)
      return commandData?.execute({
        sender: data.sender,
        args: parsedCommand.args,
      })
    const tags: string[] = data.sender.getTags()
    const found = tags.some((r) => commandData.options.permissionTags?.includes(r))
    if (!found) return data.sender.sendMessage('§cYou dont have permission to use this command!')

    return commandData.execute({
      sender: data.sender,
      args: parsedCommand.args,
    })
  }

  public registerCommand(options: CommandOptions, callback: (data: CommandResponse) => void): void {
    if (this._commands.has(options.command)) return
    if (options.showInList === undefined) options.showInList = true
    this._commands.set(options.command, {
      options: options,
      showInList: options.showInList,
      execute: callback,
    })
    if (!options.aliases) return
    for (const aliases of options.aliases) {
      if (this._commands.has(aliases)) continue
      this._commands.set(aliases, {
        options: options,
        showInList: false,
        execute: callback,
      })
    }
  }

  public getCommands(): Map<string, CommandMapOptions> {
    return this._commands
  }

  public getPrefix(): string {
    return this._prefix
  }

  public setPrefix(prefix: string): void {
    this._prefix = prefix
  }

  public getId(): string {
    return this._id
  }

  public getColor(): string {
    return this._color
  }

  public getAllManagers(): Map<string, CommandManager> {
    return managers
  }
}

const commands = new CommandManager({
  id: 'default',
  prefix: '-',
})

commands.registerCommand(
  {
    command: 'about',
    description: 'Shows info about the server.',
    aliases: ['ab'],
  },
  (data) => {
    data.sender.sendMessage(
      `§7This server is running §9BeAPI v${version}§7 for §aMinecraft: Bedrock Edition v${mcbe}§7.`,
    )
  },
)

commands.registerCommand(
  {
    command: 'sm',
    description: 'Interact with the socketmanager',
    permissionTags: ['dev'],
    showInList: false,
  },
  (data) => {
    if (!data.args[0]) return data.sender.sendMessage('§cInvalid parameter! Expected <log|send>')
    switch (data.args[0]) {
    case 'log': {
      if (!data.args[1]) return data.sender.sendMessage('§cInvalid parameter! Expected <true|false>')
      switch (data.args[1]) {
      case 't':
      case 'true':
        socket.log = true

        return data.sender.sendMessage(`§7SocketManager log set to §aTRUE§7.`)
      case 'f':
      case 'false':
        socket.log = false

        return data.sender.sendMessage(`§7SocketManger log set to §cFALSE§7.`)
      default:
        break
      }
      break
    }
    case 'send': {
      if (!data.args[1]) return data.sender.sendMessage('§cInvalid parameter! Expected {}')
      const message: JsonRequest = JSON.parse(data.args.join('').replace(data.args[0], ''))
      socket.sendMessage(message)

      return data.sender.sendMessage('§7Sent.')
    }
    }
  },
)

export { commands }
