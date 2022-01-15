import type { EventManager } from '../EventManager.js'
import { between } from '../../utils/bewteen.js'

export class EntityAttacked {
  private readonly _events: EventManager
  public eventName = 'EntityAttacked'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('PlayerSwing', (player) => {
      const target = player.getPreviousEntityViewVector()
      player.setPreviousEntityViewVector(undefined)
      if (!target) return
      const targetPos = target?.getLocation()
      const playerPos = player?.getLocation()
      if (
        !(
          between(targetPos.x + 5, targetPos.x - 5, playerPos.x) &&
          between(targetPos.y + 5, targetPos.y - 5, playerPos.y) &&
          between(targetPos.z + 5, targetPos.z - 5, playerPos.z)
        )
      )
        return

      return this._events.emit('EntityAttacked', {
        attacker: player,
        target: target,
      })
    })
  }
}
