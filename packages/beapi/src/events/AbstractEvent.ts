// Type imports.
import type { Client } from '..'

/**
 * Abstract Event Class. This must extended when
 * creating a new event so Client methods know
 * how to handle the event and what properties
 * are available.
 */
export default abstract class {
  /**
   * Protected client circular reference.
   */
  protected abstract readonly _client: Client
  /**
   * Protected logic *(bound to `this`)*.
   * See any of the events for example.
   */
  protected abstract readonly _logic: CallableFunction

  /**
   * Used to ensure if `on` or `off` is accidently called twice
   * it wont add or remove two listeners.
   */
  protected abstract _registered: boolean

  /**
   * Events name that will be used when emitting
   * events off the client.
   *
   * :::warning
   *
   * Don't forget to use the `@setProto` decorator
   * so name is readable on prototype. *(See any of the
   * premade events for example.)*
   *
   * :::
   */
  public abstract readonly name: string

  /**
   * Events name assigned by Minecraft.
   * If this is not a Minecraft event leave this
   * field as `custom`
   *
   * :::warning
   *
   * Don't forget to use the `@setProto` decorator
   * so name is readable on prototype. *(See any of the
   * premade events for example.)*
   *
   * :::
   */
  public abstract readonly iName: string

  /**
   * Unused by most events as it was never implemented.
   * was supposed to always cancel events.
   */
  public abstract readonly alwaysCancel: boolean

  /**
   * Called by the event manager when read to enable the event
   * listeners. *(See any of the premade events for example.)*
   */
  public abstract on(): void
  /**
   * Called by the event manager when event is disabled to remove
   * any listeners. *(See any of the premade events for example.)*
   */
  public abstract off(): void

  /**
   * Actual logic before being bound to `this` for handling
   * the listener in `on` method.
   *
   * :::warning
   *
   * This method should not be used in the listener directly on, `on`.
   * It should be bound to `this` first then assigned to `_logic`.
   * *(See any of the premade events for example.)*
   *
   * :::
   * @param args
   */
  protected abstract __logic(...args: any[]): void
}
