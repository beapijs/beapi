import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import type { Player } from 'mojang-minecraft'

export class PlayerAttacked {
  private readonly _events: EventManager
  public eventName = 'PlayerAttacked'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('PlayerSwing', (player) => {
      const entity = player.getVanilla().getEntitiesFromViewVector()[0]
      if (!entity || entity.id !== 'minecraft:player') return
      const target = players.getPlayerByVanilla(entity as Player)
      if (!target) return

      return this._events.emit('PlayerAttacked', {
        attacker: player,
        target: target,
      })
    })
  }
}
