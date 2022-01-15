import type { EventManager } from '../EventManager.js'
import { players } from '../../player/PlayerManager.js'
import { entities } from '../../entity/EntityManager.js'
import { BeforeItemUseEvent, world } from 'mojang-minecraft'

export class ItemUse {
  private readonly _events: EventManager
  public eventName = 'ItemUse'
  // @ts-expect-error We don't care about "ts(2564)"
  private prev: BeforeItemUseEvent

  public constructor(events: EventManager) {
    this._events = events
    world.events.beforeItemUse.subscribe((data) => {
      this.prev = data
      let source
      if (data.source.id === 'minecraft:player') {
        source = players.getPlayerByNameTag(data.source.nameTag)
      } else {
        source = entities.getEntityByVanilla(data.source)
      }
      if (!source) return

      return this._events.emit('ItemUse', {
        source: source,
        item: data.item,
        cancelEvent: this.cancel.bind(this),
      })
    })
  }

  private cancel(): void {
    this.prev.cancel = true
  }
}
