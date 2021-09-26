import {
  executeCommand,
  commands,
  events,
  world,
  setTimeout,
} from './beapi/BeAPI.js'

events.on('PlayerJoin', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('PlayerLeft', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('EntityCreate', (entity) => {
  //executeCommand(`say ${entity.id} spawned!`)
})

events.on('Explosion', (data) => {
  setTimeout(() => {
    data.impactedBlocks.forEach((block) => {
      executeCommand(`setblock ${block.x} ${block.y} ${block.z} diamond_block`)
    })
  }, 5)
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
