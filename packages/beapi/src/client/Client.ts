// Regular imports.
import {
  EventEmitter,
  events,
  PlayerManager,
  EntityManager,
  CommandManager,
  WorldManager,
  ScoreboardManager,
  TestManager,
  version,
  mcbe,
  protocol,
} from '../'
import { Events, world } from 'mojang-minecraft'

// Type imports.
import type AbstractEvent from '../events/AbstractEvent'
import type { DimensionType, ServerCommandResponse, ClientEvents, Awaitable, ClientOptions } from '../'

// Client Listener Type Event Overrides.
export interface Client {
  on: (<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>) => void) &
    (<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ) => void)

  addListener: (<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => Awaitable<void>,
  ) => void) &
    (<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ) => void)

  once: (<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>) => this) &
    (<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ) => void)

  emit: (<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]) => void) &
    (<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]) => void)

  envokeEvent: (<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]) => void) &
    (<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]) => void)

  off: (<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>) => void) &
    (<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ) => void)

  removeListener: (<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => Awaitable<void>,
  ) => void) &
    (<S extends string | symbol>(
      event: Exclude<S, keyof ClientEvents>,
      listener: (...args: any[]) => Awaitable<void>,
    ) => void)

  removeListeners: (<K extends keyof ClientEvents>(event?: K) => void) &
    (<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>) => void)
}

/**
 * Client is the main entrypoint of BeAPI. Here is where
 * you will interact with almost everything!
 *
 * ```ts
 *  import { Client } from 'beapi-core';
 *
 *  const client = new Client();
 *  ...
 * ```
 */
export class Client extends EventEmitter {
  /**
   * Protected map to keep track of registered events.
   */
  protected readonly _events = new Map<string, AbstractEvent>()
  /**
   * Protected reference to client options.
   */
  protected readonly _options: ClientOptions

  /**
   * The main hub for interacting with and managing players in the world.
   */
  public readonly players = new PlayerManager(this)
  /**
   * The main hub for interacting with and manging entities in the world.
   */
  public readonly entities = new EntityManager(this)
  /**
   * The main hub for interacting with BeAPI chat commands in the world.
   */
  public readonly commands = new CommandManager(this)
  /**
   * The main hub for interacting with the Minecraft world.
   */
  public readonly world = new WorldManager(this)
  /**
   * The main hub for interacting with scoreboards in the world.
   */
  public readonly scoreboards = new ScoreboardManager(this)
  /**
   * The main hub for creating and executing tests.
   */
  public readonly tests = new TestManager(this)
  /**
   * Current BeRP version.
   */
  public readonly currentVersion = version
  /**
   * Current MCBE version.
   */
  public readonly currentMCBE = mcbe
  /**
   * Current MCBE protocol version.
   */
  public readonly currentProtocol = protocol

  /**
   * Client is the main entrypoint of BeAPI. Here is where
   * you will interact with almost everything!
   *
   * ```ts
   *  import { Client } from 'beapi-core';
   *
   *  const client = new Client();
   *  ...
   * ```
   * @param options Optional client options.
   */
  public constructor(options: ClientOptions = {}) {
    super()
    this._options = options
    // If enableEvents array then we only
    // want to enable the events they have
    // defined.
    if (this._options.enableEvents) {
      for (const event of events) {
        // If included events contains
        // events name.
        if (this._options.enableEvents.includes(event.prototype.name)) {
          // If events does not already contain
          if (!this._events.has(event.prototype.name)) {
            // Load the unregistered event.
            this.loadEvent(event)
          }
        }
      }
      // Else we want to assume all need to be
      // Enabled
    } else {
      // For each event exported from events
      for (const event of events) {
        // If events does not already contain
        if (!this._events.has(event.prototype.name)) {
          // Load the unregistered event.
          this.loadEvent(event)
        }
      }
    }
    // Checks if commands were disabled in the options
    if (this._options.commandsDisabled) {
      // Disables the command manager
      this.commands.disable()
    }
    // Checks if a custom prefix was provided
    if (this._options.commandsPrefix) {
      // Sets the prefix
      this.commands.setPrefix(this._options.commandsPrefix)
    }
  }

  /**
   * Sends deprecated event message in content log.
   * @param name Name of event
   * @returns
   */
  protected deprecated(name: string): void {
    return console.warn(
      `[BeAPI]: Event "${name}" appears be deprecated, skipping registration. Please report this issue here: https://github.com/MCBE-Utilities/BeAPI/issues`,
    )
  }

  /**
   * Loads a new event on the client. Events loaded MUST extend `AbstractClass`.
   * See [events folder](https://github.com/MCBE-Utilities/BeAPI/tree/beta/packages/beapi/src/events) for formatting.
   * @param event Non contructed event to load.
   * @returns
   */
  public loadEvent(event: new (client: Client) => AbstractEvent): void {
    const builtEvent = new event(this)

    if (!this.verifyIEvent(builtEvent.iName)) return this.deprecated(builtEvent.iName)

    this._events.set(builtEvent.name, builtEvent)
    builtEvent.on()
  }

  /**
   * Removes an event from the client and calls the events `off` method.
   * @param name Name of the event.
   */
  public removeEvent(name: string): void {
    const event = this._events.get(name)
    if (this._events.delete(name)) event?.off()
  }

  /**
   * Attempts to get an event by its name.
   * @param name Name of the event.
   * @returns can be `undefined`
   */
  public getEvent(name: string): AbstractEvent | undefined {
    return this._events.get(name)
  }

  /**
   * Verifies an event is a valid Minecraft IEvent.
   * The name `custom` returns `true` because BeAPI registers
   * a handful of custom events not made by Minecraft.
   * @param name Name of IEvent.
   * @returns `true` means exists.
   */
  public verifyIEvent(name: string): boolean {
    if (name === 'custom') return true
    return Object.keys(Events.prototype).includes(name)
  }

  /**
   * Returns an array of all Minecraft IEvents.
   * @returns
   */
  public getAllIEvents(): string[] {
    return Object.keys(Events.prototype)
  }

  /**
   * Executes a world level command.
   * @param cmd Command string.
   * @param dimension Optional dimensino to execute in.
   * @param debug Send errors to content log?
   * @returns
   */
  public executeCommand<T>(
    cmd: string,
    dimension: DimensionType = 'overworld',
    debug = false,
  ): ServerCommandResponse<T> {
    try {
      const command = world.getDimension(dimension).runCommand(cmd) as ServerCommandResponse<T>

      return {
        statusMessage: command.statusMessage,
        data: command as unknown as T,
        err: false,
      }
    } catch (error) {
      if (debug) console.info(`[executeCommand]: ${String(error)}`)

      return {
        statusMessage: String(error),
        data: null,
        err: true,
      }
    }
  }
}
