import {
  events,
  entities,
} from '../beapi/BeAPI.js'

// TEST: Creates a simple health bar above each entity

events.on('tick', () => {
  for (const [, entity] of entities.getEntityList()) {
    try {
      const health = entity.getVanilla().getComponent('minecraft:health')
      entity.setNameTag(`§c${health.current}§7/§c${health.value}§r`)
    } catch (err) {}
  }
})
