import type { CommandEntry, CommandOptions, CommandCallable, CommandArguments, OnChatEvent } from '../types'
import { checkObjectForCommandTypes, CommandExecState } from '.'
import type { Client } from '../client'
import type { Player } from '../player'
import { CommandTypes } from './CommandTypes'

// Static array of command type constructors.
const commandTypes: typeof CommandTypes[keyof typeof CommandTypes][] = []
for (const key in CommandTypes) {
  if (key) commandTypes.push(CommandTypes[key as keyof typeof CommandTypes])
}

/**
 * Verifies command schema has only command types as values
 * or [CommandType, boolean] otherwise returns key of the invalid.
 * @param schema
 * @returns
 */
function verifyDefinitionTypes<T extends CommandArguments>(schema: T): string | undefined {
  for (const key of Object.keys(schema)) {
    const v = schema[key]
    if (Array.isArray(v)) {
      if (v.length > 2) return key
      if (!commandTypes.includes(v[0])) return key
      if (typeof v[1] !== 'boolean') return key
    } else if (!commandTypes.includes(v)) return key
  }
}

/**
 * Primary class for interacting with BeAPI commands.
 *
 * Mach 3 bb <3
 */
export class CommandManager {
  /**
   * Reference to main client object.
   */
  protected _client: Client
  /**
   * Map containing all command entries.
   */
  protected _commands = new Map<string, CommandEntry<never>>()

  /**
   * Command manager should be used?
   */
  protected _enabled = false

  /**
   * Prefix to use.
   */
  protected _prefix = '-'

  /**
   * Bound handler reference.
   */
  protected __onChatHandler = this._onChatHandler.bind(this)

  /**
   * ...
   */
  public constructor(client: Client) {
    this._client = client

    this.enable()
  }

  /**
   * Logic for try executing commands when chat is used.
   * @param e On chat event.
   */
  protected _onChatHandler(e: OnChatEvent): void {
    return this.tryExecuteFrom(e.message, e.sender!, e)
  }

  /**
   * Disable command manager.
   */
  public disable(): void {
    if (!this._enabled) return
    this._enabled = false
    this._client.removeListener('OnChat', this.__onChatHandler)
  }

  /**
   * Enable command manager.
   */
  public enable(): void {
    if (this._enabled) return
    this._enabled = true
    this._client.addListener('OnChat', this.__onChatHandler)
  }

  /**
   * Get command manager enabled status.
   * @returns {boolean}
   */
  public getEnabled(): boolean {
    return Boolean(this._enabled)
  }

  /**
   * Change the current prefix to something different.
   * @param {string} prefix New prefix to use.
   */
  public setPrefix(prefix: string): void {
    this._prefix = prefix
  }

  /**
   * Get the current prefix.
   * @returns {string}
   */
  public getPrefix(): string {
    return this._prefix
  }

  /**
   * Get all commands as a map.
   * @returns {Map<string, CommandEntry<never>>}
   */
  public getAll(): Map<string, CommandEntry<never>> {
    return this._commands
  }

  /**
   * Get all commands as an array.
   * @returns {CommandEntry<never>[]}
   */
  public getAllAsArray(): CommandEntry<never>[] {
    return Array.from(this._commands.values())
  }

  /**
   * Get command by its name.
   * @param name Name of command.
   * @returns {CommandEntry<never> | undefined}
   */
  public getCommand(name: string): CommandEntry<never> | undefined {
    return this._commands.get(name)
  }

  /**
   * Register a new command with no extra options and no arguments.
   * @param name Name of command.
   * @param description Description of command.
   * @param callback Callback method.
   * @returns
   */
  public register(name: string, description: string, callback: CommandCallable<never>): CommandEntry<never>
  /**
   * Register a new command with extra options and no arguments.
   * @param name Name of command.
   * @param description Description of command.
   * @param options Extra options.
   * @param callback Callback method.
   * @returns
   */
  public register(
    name: string,
    description: string,
    options: CommandOptions,
    callback: CommandCallable<never>,
  ): CommandEntry<never>
  /**
   * Register a new command with arguments and no extra options.
   * @param name Name of command.
   * @param description Description of command.
   * @param schema Command arguments.
   * @param callback Callback method.
   * @returns
   */
  public register<T extends CommandArguments>(
    name: string,
    description: string,
    schema: T,
    callback: CommandCallable<T>,
  ): CommandEntry<T>
  /**
   * Register a new command with arguments and extra options.
   * @param name Name of command.
   * @param description Description of command.
   * @param options Command arguments.
   * @param schema Command arguments.
   * @param callback Callback method.
   * @returns
   */
  public register<T extends CommandArguments>(
    name: string,
    description: string,
    options: CommandOptions,
    schema: T,
    callback: CommandCallable<T>,
  ): CommandEntry<T>
  /**
   * Implementation Function
   * @param name Name of command.
   * @param description Description of command.
   * @param optionsSchemaOrCallback Can be either options, schema, or callback.
   * @param schemaOrCallback Can be either schema or callback.
   * @param callback Callback method.
   * @returns
   */
  public register<T extends CommandArguments>(
    name: string,
    description: string,
    optionsSchemaOrCallback: CommandOptions | T | CommandCallable<T>,
    schemaOrCallback?: T | CommandCallable<T>,
    callback?: CommandCallable<T>,
  ): CommandEntry<T> {
    /**
     * Command options, can be undefined.
     */
    let _options: CommandOptions | undefined

    /**
     * Command argument schema, can be undefined.
     */
    let _schema: T | undefined

    /**
     * Command callback, cannot be undefined.
     */
    let _callback: CommandCallable<T>

    // If optionsSchemaOrCallback is a function then it must be the callback.
    if (typeof optionsSchemaOrCallback === 'function')
      // Assign callback to optionsSchemaOrCallback.
      _callback = optionsSchemaOrCallback
    // Use checkObjectForCommandTypes on optionsSchemaOrCallback if it
    // returns true then it must be the argument schema.
    else if (checkObjectForCommandTypes(optionsSchemaOrCallback))
      // Assign arguments schema to optionsSchemaOrCallback.
      _schema = optionsSchemaOrCallback as T
    // No other options so must be extra options. Assign options
    // to optionsSchemaOrCallback.
    else _options = optionsSchemaOrCallback as CommandOptions

    // If schemaOrCallback exists then there is a 4th parameter that
    // needs to be handled.
    if (schemaOrCallback) {
      // If schemaOrCallback is typeof function then assign callback
      // to schemaOrCallback because it has to be callback.
      if (typeof schemaOrCallback === 'function') _callback = schemaOrCallback
      // Else assign schema to schemaOrCallback because if its not
      // Callback it must be argument schema.
      else _schema = schemaOrCallback
    }

    // If callback exists then 5th argument was defined and
    // It must be the callback.
    if (callback) _callback = callback

    // Verify everything on the schema is correct
    if (_schema) {
      const check = verifyDefinitionTypes(_schema)
      if (check)
        throw new Error(
          `Invalid argument schema when registering command "${name}". Key "${check}" expected a CommandType or [CommandType, boolean]!`,
        )
    }

    // Create a new command entry.
    const entry: CommandEntry<T> = {
      name,
      description,
      // // @ts-expect-error Does not need to be defined
      ...(_options ?? {}),
      // // @ts-expect-error Does not need to be defined
      schema: _schema ?? {},
      // @ts-expect-error Will always be defined
      call: _callback,
    }

    // Set it in commands map.
    this._commands.set(name, entry)

    // Return the new entry.
    return entry
  }

  /**
   * Attempts to delete a command based off
   * its name.
   * @param {string} name Name of the command.
   * @returns {boolean}
   */
  public unregister(name: string): boolean {
    return this._commands.delete(name)
  }

  /**
   * Acts like an eval function for commands.
   * Takes in a string and trys to parse and execute
   * it as a command.
   *
   * Also needs a player to pipe data to.
   *
   * @param str Command String.
   * @param player Player executor.
   */
  public tryExecuteFrom(str: string, player: Player, e: OnChatEvent): void {
    // If string does not start with prefix
    // no need to continue.
    if (!str.startsWith(this._prefix)) return
    e.cancel()

    // Create a new command execution state
    const state = new CommandExecState(this, player, str)

    // Try to execute new command state.
    try {
      state.tryExecute()
    } catch (error) {
      const messageContent = (error as Error).message
      player.sendMessage(`§c§¢${messageContent}`)
      // console.error(messageContent)
    }
  }
}
