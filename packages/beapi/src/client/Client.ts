import type AbstractEvent from '../events/AbstractEvent'
import { EventEmitter } from '../polyfill'
import { events } from '../events'
import { PlayerManager } from '../player'
import type { Dimension, ServerCommandResponse, ClientEvents, Awaitable, ClientOptions } from '../types'
import { Events, world } from 'mojang-minecraft'
import { EntityManager } from '../entity'
import { CommandManager } from '../commands'
import { WorldManager } from '../world'
import { ScoreboardManager } from '../scoreboard'
import { version, mcbe, protocol } from '../version'
import { deprecated } from '../utils'

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

export class Client extends EventEmitter {
  protected readonly _events = new Map<string, AbstractEvent>()
  protected readonly _options: ClientOptions
  public readonly players = new PlayerManager(this)
  public readonly entities = new EntityManager(this)
  public readonly commands = new CommandManager(this)
  public readonly world = new WorldManager(this)
  public readonly scoreboards = new ScoreboardManager(this)
  public readonly currentVersion = version
  public readonly currentMCBE = mcbe
  public readonly currentProtocol = protocol

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

  public loadEvent(event: new (client: Client) => AbstractEvent): void {
    const builtEvent = new event(this)

    if (!this.verifyIEvent(builtEvent.iName)) return deprecated(builtEvent.iName)

    this._events.set(builtEvent.name, builtEvent)
    builtEvent.on()
  }

  public removeEvent(name: string): void {
    const event = this._events.get(name)
    if (this._events.delete(name)) event?.off()
  }

  public getEvent(name: string): AbstractEvent | undefined {
    return this._events.get(name)
  }

  public verifyIEvent(name: string): boolean {
    if (name === 'custom') return true
    return Object.keys(Events.prototype).includes(name)
  }

  public getAllIEvents(): string[] {
    return Object.keys(Events.prototype)
  }

  public executeCommand<T>(cmd: string, dimension: Dimension = 'overworld', debug = false): ServerCommandResponse<T> {
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
