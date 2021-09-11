import {
  executeCommand,
  events,
  world,
} from './beapi/BeAPI.js'

//events.on('tick', (data) => {
//  executeCommand(`say ${data}`)
//})

events.on('PlayerJoin', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('PlayerLeft', (player) => {
  executeCommand(`say ${player.getName()}`)
})

events.on('PlayerMessage', (data) => {
  if (data.message == 'cancel') return data.cancelEvent(true)
  if (data.message == 'ticks') {
    data.sender.sendMessage(`${world.getTicks()}`)
    data.cancelEvent(true)
  }
})
