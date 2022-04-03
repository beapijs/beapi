// EventEmitter Polyfill by [Nobu](https://github.com/nobu-sh)

/**
 * 0.8 to 1 replica of NodeJS EventEmitter.
 * It fundamentally works the same. Some methods
 * may just be named slightly different.
 */
export class EventEmitter {
  protected readonly _listeners = new Map<string, CallableFunction[]>()
  protected max: number

  /**
   * 0.8 to 1 replica of NodeJS EventEmitter.
   * It fundamentally works the same. Some methods
   * may just be named slightly different.
   * @param max Max listeners before mem leak warnings.
   */
  public constructor(max = 50) {
    this.max = max
  }

  // Override toString/name Methods
  public static get [Symbol.toStringTag](): string {
    return '[undefined EventEmitter]'
  }

  public static get [Symbol.name](): string {
    return 'EventEmitter'
  }

  public get [Symbol.toStringTag](): string {
    return '[object EventEmitter]'
  }

  public get [Symbol.name](): string {
    return 'EventEmitter'
  }

  public static toString(): string {
    return '[undefined EventEmitter]'
  }

  public toString(): string {
    return '[object EventEmitter]'
  }

  // Primary Methods
  public addListener(event: string, listener: CallableFunction): void {
    if (this._listeners.size >= this.max) {
      console.warn(`warning: possible EventEmitter memory leak detected. ${this._listeners.size} listeners registered.`)
    }
    this._listeners.set(event, [...(this._listeners.get(event) ?? []), listener])
  }

  public removeListener(event: string, listener: CallableFunction): void {
    const listeners = this._listeners.get(event)
    listeners?.splice(listeners?.indexOf(listener))
  }

  public removeListeners(event: string): void {
    this._listeners.delete(event)
  }

  public removeAllListeners(): void {
    this._listeners.clear()
  }

  public envokeEvent(event: string, ...args: unknown[]): void {
    this._listeners.get(event)?.forEach((listener) => {
      listener(...args)
    })
  }

  public listeners(event: string): CallableFunction[] | undefined {
    return this._listeners.get(event)
  }

  public listenerCount(event: string): number {
    return this._listeners.get(event)?.length ?? 0
  }

  public getMaxListeners = () => this.max
  public setMaxListeners(n: number): void {
    this.max = n
  }

  // Abstracted Methods
  public on(event: string, listener: CallableFunction) {
    this.addListener(event, listener)
  }

  public off(event: string, listener: CallableFunction) {
    this.removeListener(event, listener)
  }

  public emit(event: string, ...args: unknown[]) {
    this.envokeEvent(event, ...args)
  }

  public once(event: string, listener: CallableFunction): void {
    const newListener = (...args: unknown[]) => {
      listener(...args)
      this.removeListener(event, newListener)
    }
    this.addListener(event, newListener)
  }
}
