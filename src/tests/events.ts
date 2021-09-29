import {
  events,
  executeCommand,
} from '../beapi/BeAPI.js'

events.on('ChatCommand', (data) => {
  executeCommand(`say ${data.sender.getName()} executed ${data.command}!`)
})

events.on('EntityCreate', (entity) => {
  executeCommand(`say ${entity.getId()} spawned with the runtimeId of ${entity.getRuntimeId()}`)
})

events.on('EntityDestroyed', (entity) => {
  executeCommand(`say ${entity.getId()}:${entity.getRuntimeId()} was destroyed!`)
})

events.on('Explosion', (data) => {
  executeCommand(`say ${data.source.id} exploded and affected ${data.impactedBlocks.length} blocks`)
})

events.on('NameTagChanged', (data) => {
  executeCommand(`say ${data.player.getName()} nameTag changed from ${data.old} to ${data.new}`)
})

events.on('PlayerJoin', (player) => {
  executeCommand(`say ${player.getName()} joined.`)
})

events.on('PlayerLeft', (player) => {
  executeCommand(`say ${player.getName()} left.`)
})

events.on('PlayerMessage', (data) => {
  executeCommand(`say ${data.sender.getName()} said ${data.message}`)
})

events.on('tick', (tick) => {
  tick
})
