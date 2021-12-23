import {
  events,
} from '../beapi/BeAPI.js'

events.on("PlayerMessage", (data) => {
  const message = data.message.split(' ').join('|')
  data.sender.addTag(`bewss:msg:${message}`)

  return data.cancelEvent(true)
})
