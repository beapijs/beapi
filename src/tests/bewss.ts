import {
  events,
  commands,
} from '../beapi/BeAPI.js'

// Import this script when using BeWss. This will emit all messages.

commands.enabled = false
events.on("PlayerMessage", (data) => {
  const message = data.message.split(' ').join('|')
  data.sender.addTag(`bewss:msg:${message}`)

  return data.cancelEvent(true)
})
