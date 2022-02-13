import type { Client } from '../client'
import type { Command, CommandCallback, CommandOptions, ParseResult, OnChatEvent } from '../types'

const defaultPrefix = '-'

export class CommandManager {
  protected readonly _client: Client
  protected readonly _handlers = new Map<string, CommandHandler>()
  protected readonly _commands = new Map<string, Command>()
  protected readonly __onChatLogic = this._onChatLogic.bind(this)

  public constructor(client: Client) {
    this._client = client

    // Register Default Commands
    this.register(
      {
        name: 'help',
        description: `Displays a list of available commands.`,
        aliases: ['h'],
      },
      (data) => {
        data.sender.sendMessage('§bShowing all Available Commands:')
        this.getAll().forEach((c) => {
          if (c.options.hidden) return
          data.sender.sendMessage(`  §7${defaultPrefix}${c.options.name}§r §o§8${c.options.description}`)
        })
      },
    )
    this.register(
      {
        name: 'about',
        description: 'Shows info about the server.',
        aliases: ['ab'],
      },
      (data) => {
        data.sender.sendMessage(
          `§7This server is running §9BeAPI v${this._client.currentVersion}§7 for §aMinecraft: Bedrock Edition v${this._client.currentMCBE}§7.`,
        )
      },
    )

    this._client.on('OnChat', this.__onChatLogic)
  }

  protected _onChatLogic(data: OnChatEvent): void {
    if (!data.sender || !data.message.startsWith('-')) return
    const result = parse(defaultPrefix, data.message)
    const command =
      this._commands.get(result.command) ??
      Array.from(this._commands.values()).find((i) => i.options.aliases?.includes(result.command))
    if (!command) {
      data.sender.sendMessage("§c§cThis command doesn't exists!")

      return data.cancel()
    }
    command.cb({
      sender: data.sender,
      args: result.args,
    })
    data.cancel()
  }

  public disable(): void {
    this._client.removeListener('OnChat', this.__onChatLogic)
  }

  public createHandler(prefix: string): CommandHandler {
    if (this._handlers.has(prefix) || prefix === defaultPrefix) {
      throw new Error(`CommandHandler with prefix "${prefix}" already exists. Cannot exceed 1!`)
    }
    const handler = new CommandHandler(this._client, this, prefix)
    this._handlers.set(prefix, handler)
    return handler
  }

  public removeHandler(prefix: string): void {
    this._handlers.delete(prefix)
  }

  public getHandler(prefix: string): CommandHandler | undefined {
    return this._handlers.get(prefix)
  }

  public getHandlers(): Map<string, CommandHandler> {
    return this._handlers
  }

  public setHandler(prefix: string, handler: CommandHandler): void {
    if (this._handlers.has(prefix) || prefix === defaultPrefix) {
      throw new Error(`CommandHandler with prefix "${prefix}" already exists. Cannot exceed 1!`)
    }
    this._handlers.set(prefix, handler)
  }

  public register(options: CommandOptions, cb: CommandCallback): void {
    this._commands.set(options.name, {
      options,
      cb,
    })
  }

  public unregister(name: string): void {
    this._commands.delete(name)
  }

  public get(name: string): Command | undefined {
    return this._commands.get(name) ?? Array.from(this.getAll().values()).find((c) => c.options.aliases?.includes(name))
  }

  public getAll(): Map<string, Command> {
    return this._commands
  }
}

export class CommandHandler {
  protected readonly _client: Client
  protected readonly _cm: CommandManager
  protected readonly _commands = new Map<string, Command>()
  protected prefix: string
  public constructor(client: Client, cm: CommandManager, prefix: string) {
    this._client = client
    this._cm = cm
    this.prefix = prefix

    // Register Default Commands
    this.register(
      {
        name: 'help',
        description: `Displays a list of available commands.`,
        aliases: ['h'],
      },
      (data) => {
        data.sender.sendMessage('§bShowing all Available Commands:')
        this.getAll().forEach((c) => {
          if (c.options.hidden) return
          data.sender.sendMessage(`  §7${this.prefix}${c.options.name}§r §o§8${c.options.description}`)
        })
      },
    )

    this._client.on('OnChat', (data) => {
      if (!data.sender || !data.message.startsWith(this.getPrefix())) return
      const result = parse(this.prefix, data.message)
      const command =
        this._commands.get(result.command) ??
        Array.from(this._commands.values()).find((i) => i.options.aliases?.includes(result.command))
      if (!command) {
        data.sender.sendMessage("§c§cThis command doesn't exists!")

        return data.cancel()
      }
      command.cb({
        sender: data.sender,
        args: result.args,
      })
      data.cancel()
    })
  }

  public changePrefix(prefix: string): void {
    if (this._cm.getAll().has(prefix) || prefix === defaultPrefix) {
      throw new Error(`Cannot change prefix to "${prefix}". Another command handler already reserves that prefix!`)
    }
    this._cm.removeHandler(this.prefix)
    this.prefix = prefix
    this._cm.setHandler(prefix, this)
  }

  public getPrefix(): string {
    return String(this.prefix)
  }

  public register(options: CommandOptions, cb: CommandCallback): void {
    this._commands.set(options.name, {
      options,
      cb,
    })
  }

  public unregister(name: string): void {
    this._commands.delete(name)
  }

  public get(name: string): Command | undefined {
    return this._commands.get(name) ?? Array.from(this.getAll().values()).find((c) => c.options.aliases?.includes(name))
  }

  public getAll(): Map<string, Command> {
    return this._commands
  }
}

export function parse(prefix: string, content: string): ParseResult {
  const split = content
    .replace(prefix, '')
    .split(' ')
    .filter((i) => i.length)
  const command = split.shift()
  return {
    command: command ?? '',
    args: split,
  }
}
