interface listener {
  eventName: string
  runtimeId: number
  callback: CallableFunction
  once: boolean
}

export class emitter {
  private listeners: listener[]
  private runtimeId = 0

  public constructor() {
    this.listeners = []
    this.runtimeId = 0
  }

  public addListner(event: string, callback: (data: any) => void, once = false): void {
    this.runtimeId++
    this.listeners.push({
      eventName: event,
      runtimeId: this.runtimeId,
      callback: callback,
      once: once,
    })
  }

  public removeListner(event: string): void {
    this.listeners.splice(
      this.listeners.findIndex((x) => x.eventName === event),
      1,
    )
  }

  public removeAllListners(): void {
    this.listeners = []
  }

  public getListners(): listener[] {
    return this.listeners
  }

  public on(event: string, callback: (data: any) => void): void {
    this.addListner(event, callback, false)
  }

  public once(event: string, callback: (data: any) => void): void {
    this.addListner(event, callback, true)
  }

  public emit(event: string, data: unknown): void {
    this.listeners.forEach((listener) => {
      if (listener.eventName !== event) return
      listener.callback(data)
      if (listener.once) return this.removeListner(listener.eventName)
    })
  }
}
