import { World } from 'Minecraft'

class tick {
  constructor(events) {
    this.eventName = 'tick'
    this.events = events
    this.ticks = 0
    World.events.tick.subscribe(() => {
      this.ticks++
      this.events.emit('tick', this.ticks)
    })
  }
}

export {
  tick,
}
