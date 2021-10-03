import {
  socket,
  commands,
  world,
} from '../beapi/BeAPI.js'

commands.registerCommand({
  command: "sk-t",
  description: "Send a ping to BeRP SocketManager",
}, (data) => {
  if (!socket.enabled) return data.sender.sendMessage('Socket is disabled! Please connect a BeRP bot to use sockets.')
  socket.sendMessage({
    berp: {
      event: "Ping",
      requestId: "",
    },
  })

  return data.sender.sendMessage("Ping sent! Awaiting response!")
})

socket.on("Message", (data) => {
  if (data.event != "Pong") return
  world.sendMessage('Pong! Sent from BeRP.')
})
