import type { EventManager } from '../EventManager.js'

export class EntityAttacked {
  private readonly _events: EventManager
  public eventName = 'EntityAttacked'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('PlayerSwing', (player) => {
      const target = player.getPreviousEntityViewVector()
      if (!target) return

      return this._events.emit('EntityAttacked', {
        attacker: player,
        target: target,
      })
    })
  }
}
