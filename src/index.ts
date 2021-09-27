import {
  executeCommand,
  commands,
  events,
  world,
  setTimeout,
  entities,
} from './beapi/BeAPI.js'

events.on('PlayerJoin', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('PlayerLeft', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('Explosion', (data) => {
  setTimeout(() => {
    data.impactedBlocks.forEach((block) => {
      executeCommand(`setblock ${block.x} ${block.y} ${block.z} diamond_block`)
    })
  }, 5)
})

events.on('EntityDestroyed', (entity) => {
  //executeCommand(`say ${entity.getId()} was removed`)
})

events.on('PlayerMessage', (data) => {
  if (data.message == 'cancel') return data.cancelEvent(true)
  if (data.message == 'ticks') {
    data.sender.sendMessage(`${world.getTicks()}`)
    data.cancelEvent(true)
  }
})

commands.enabled = true
commands.registerCommand({
  command: 'ping',
  aliases: ["p"],
  description: "Ping the server!",
}, (data) => {
  data
})

//events.on('tick', () => {
//  for (const [, entity] of entities.getEntityList()) {
//    try {
//      if (entity.getId() == "minecraft:item" || entity.getId() == "minecraft:xp_orb") continue
//      const health = entity.getVanilla().getComponent('health')
//      entity.setNameTag(`§c${health.current}§7/§c${health.value}§r`)
//    } catch (err) {
//
//    }
//  }
//})
