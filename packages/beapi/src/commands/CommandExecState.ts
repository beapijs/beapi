import type { CommandManager } from '.'
import type { Player } from '../player'
import type { CommandEntry, CommandArgumentTypes } from '../types'

/**
 * Used for keeping track of the execution state of a command.
 * Yeah yeah, this is a very odd way of going about it however
 * it allows for better error messages easier!
 *
 * This is prone to change in the future to allow for even better
 * error messages including argument names etc.
 */
export class CommandExecState {
  /**
   * Command Manager Reference.
   */
  protected readonly _manager: CommandManager
  /**
   * Command Executor Player Reference.
   */
  protected readonly _player: Player
  /**
   * Non mutated reference to splitted execString.
   */
  protected readonly _split: string[]
  /**
   * Mutated reference to keep a pointer of current position in split.
   */
  protected _splitPos = 0
  /**
   * Reference to command entry. Could turn up undefined if invalid command.
   */
  protected _cmdRef: CommandEntry<never> | undefined

  /**
   * Non mutable command string to execute.
   */
  public readonly execString: string

  /**
   * Command execution progress state manager.
   * Used for bettering errors and simplifying argument extraction.
   *
   * @param {CommandManager} manager CommandManager Reference.
   * @param {string} execString Command string to execute.
   */
  public constructor(manager: CommandManager, player: Player, execString: string) {
    // Assign parameters to according properties
    this.execString = execString
    this._manager = manager
    this._player = player

    // Remove prefix from execution string, split on space, and assign to split property.
    this._split = this.execString.substring(this._manager.getPrefix().length).split(' ')

    // Attempt to get command from first argument could be alias or actual name so we
    // extract the name from arguments array and attempt to find a matching command
    // in the command array by checking against aliases and names.
    const commandName = this._split[this._splitPos++]
    this._cmdRef = this._manager.getAllAsArray().find((c) => c.name === commandName || c.aliases?.includes(commandName))
  }

  /**
   * Checks if the command was valid or not.
   * @returns {boolean}
   */
  public isValid(): boolean {
    if (this._cmdRef) return true
    return false
  }

  /**
   * Gets current location of execution on command string.
   * @returns {number}
   */
  protected _getIndex(): number {
    // Add prefix length to length of split command string array joined by spaces.
    return this._manager.getPrefix().length + this._split.slice(0, this._splitPos).join(' ').length
  }

  /**
   * Throws invalid command error and stops execution.
   *
   * Stops execution **
   */
  protected _throwInvalidCommand(): void {
    throw new Error(`Unable to find command with the name "${this._split[0]}"!`)
  }

  /**
   * Attempts to build command string arguments in object.
   * If any of the CommandTypes extract methods fail it will
   * return undefined which is then used to stop execution.
   *
   * All syntax errors will be thrown from within CommandTypes
   * extract methods.
   * @returns {Record<string, any> | undefined}
   */
  protected _buildArgs(): Record<string, any> | undefined {
    // Initialize object and create shortened schema ref variable.
    const object: Record<string, any> = {}
    const schema = this._cmdRef!.schema

    // Create a loop initializing a variable key for each key in the parameter schema.
    for (const key of Object.keys(schema)) {
      // Get CommandType constructor by checking if keys value in schema is an Array.
      // If its an array the constructor is located at index 0, otherwise value is the constructor.
      const constructor: CommandArgumentTypes = Array.isArray(schema[key])
        ? (schema[key] as [CommandArgumentTypes, boolean])[0]
        : (schema[key] as CommandArgumentTypes)

      // Get optional status of argument by checking if keys value in schema is an Array.
      // If its an array the optional bool is located at index 1, otherwise assumed to be false.
      const optional = Array.isArray(schema[key]) ? (schema[key] as [CommandArgumentTypes, boolean])[1] ?? false : false

      // If current argument is optional and all remaining elements in split array are empty
      // Break the loop as there is no reason to continue.
      if (optional && !this._split.slice(this._splitPos).filter((i) => i.length).length) break

      // Assign property in object with current schema key to constructors extraction result.
      object[key] = constructor.extract(this)

      // if (!object[key] && optional) break
      // If no value was assigned from extraction result it is handled as an error.
      // So we will return undefined.
      if (object[key] === undefined) return undefined
    }

    // If everything above goes well and there are no early returns,
    // We can assume all went well and return newly contructed args.
    return object
  }

  /**
   * Attempts to read the next argument in split array and increments
   * current position.
   *
   * This has a chance to return undefined as it will continously try
   * to access the next element even if its not allocated.
   *
   * @returns {string | undefined}
   */
  public readNext(): string | undefined {
    return this._split[this._splitPos++]
  }

  /**
   * Attempts to read the current argument in split array.
   *
   * This has a chance to return undefined as split position
   * could be pointing to a non allocated index.
   *
   * @returns {string | undefined}
   */
  public readCurrent(): string | undefined {
    return this._split[this._splitPos + 1]
  }

  /**
   * Checks if the user has sufficient permissions to execute
   * the command.
   */
  protected _checkPermissions(): void {
    if (this._cmdRef?.permissionTags?.length) {
      for (const tag of this._cmdRef.permissionTags) {
        if (!this._player.hasTag(tag)) return this.throwPermissionError()
      }
    }
  }

  /**
   * Attempts to execute the command state.
   */
  public tryExecute(): void {
    // If no command reference then invalid command.
    if (!this._cmdRef) return this._throwInvalidCommand()

    // Verify permissions before continue
    this._checkPermissions()

    // Attempt to build the arguments. Can return undefined as mentioned.
    const args = this._buildArgs()
    // If arguments are undefined we assume it was an error so return.
    if (!args) return

    // Emit command used event
    let cancel = false
    this._manager.getClient().emit('CommandUsed', {
      command: this._cmdRef,
      sender: this._player,
      args,
      cancel: () => {
        cancel = true
      },
    })

    // If cancelled return.
    // Cancels must be syncronous and pretty instant.
    if (cancel) return

    // If all is well then we call the commands callback with the player
    // and the final constructed arguments.
    this._cmdRef.call(this._player, args as never)
  }

  /**
   * Throws a insufficient permission error not allowing the client to
   * continue.
   */
  public throwPermissionError(): void {
    throw new Error('You do not have sufficient permissions to use this command!')
  }

  /**
   * Generates a usage string for the current command.
   *
   * @returns {string}
   */
  public generateUsage(): string {
    // If predefined usage return that instead of generating one.
    if (this._cmdRef?.usage) return this._cmdRef.usage

    // Grab all keys as array from parameter schema.
    const keys = Object.keys(this._cmdRef?.schema ?? {})

    // Map the keys into individual strings.
    const args = keys
      .map((k) => {
        // Get value from key in object schema.
        const obj = this._cmdRef!.schema[k]

        // Get the constructor, schema value can be
        // of type array. If array constructor should
        // be in index 0.
        const constructor = Array.isArray(obj) ? obj[0] : obj
        // Get optional status of command if its an array
        // Its located at index 1 otherwise assume not optional
        const optional = Array.isArray(obj) ? obj[1] ?? false : false

        // Create correct opening and closing braces
        const openingBrace = optional ? '[' : '<'
        const closingBrace = optional ? ']' : '>'

        // Put the cake together.
        return `${openingBrace}${k}: ${constructor.displayName}${closingBrace}`
      })
      // Join with spaces.
      .join(' ')

    // Return new usage :).
    return `${this._manager.getPrefix()}${this._cmdRef?.name} ${args}`
  }

  /**
   * Throws a syntax error to the executor.
   * It will contain useful information on what was
   * messed up and how to possibly fix it.
   *
   * Stops execution **
   *
   * @param {string} msg Pointer tip message.
   */
  public throwSyntaxError(msg: string): void {
    const pad = Array(this._getIndex()).fill('').join(' ')

    throw new Error(
      `${this.generateUsage()}\n --> Invalid usage at 0:${this._getIndex()}\n  |\n  | ${
        this.execString
      }\n  | ${pad}^ ${msg}\n  |`,
    )
  }
}
