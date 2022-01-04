import type { Listener } from '../../@types/BeAPI.i'

export class emitter {
  private listeners: Listener[]
  private runtimeId = 0

  public constructor() {
    this.listeners = []
    this.runtimeId = 0
  }

  public addListener(event: string, callback: (data: any) => void, once = false): void {
    this.runtimeId++
    this.listeners.push({
      eventName: event,
      runtimeId: this.runtimeId,
      callback: callback,
      once: once,
    })
  }

  public removeListener(event: string): void {
    this.listeners.splice(
      this.listeners.findIndex((x) => x.eventName === event),
      1,
    )
  }

  public removeAllListeners(): void {
    this.listeners = []
  }

  public getListeners(): Listener[] {
    return this.listeners
  }

  public on(event: string, callback: (data: any) => void): void {
    this.addListener(event, callback, false)
  }

  public once(event: string, callback: (data: any) => void): void {
    this.addListener(event, callback, true)
  }

  public emit(event: string, data: unknown): void {
    this.listeners.forEach((listener) => {
      if (listener.eventName !== event) return
      listener.callback(data)
      if (listener.once) return this.removeListener(listener.eventName)
    })
  }
}
