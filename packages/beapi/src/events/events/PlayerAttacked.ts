import type { EventManager } from '../EventManager.js'
import { between } from '../../utils/bewteen.js'

export class PlayerAttacked {
  private readonly _events: EventManager
  public eventName = 'PlayerAttacked'

  public constructor(events: EventManager) {
    this._events = events
    this._events.on('PlayerSwing', (player) => {
      const target = player.getPreviousPlayerViewVector()
      player.setPreviousPlayerViewVector(undefined)
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

      return this._events.emit('PlayerAttacked', {
        attacker: player,
        target: target,
      })
    })
  }
}
