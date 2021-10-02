import {
  events,
  world,
} from '../beapi/BeAPI.js'

events.on('PlayerMessage', (data) => {
  const tags = data.sender.getTags()
  let rank: string
  for (const tag of tags) {
    if (!tag.startsWith('rank:')) continue
    rank = tag.replace('rank:', '')
  }
  if (rank == undefined) rank = "§eMember"
  world.sendMessage(`§l§8[§r${rank}§l§8]§r §7${data.sender.getName()}:§r ${data.message}`)

  return data.cancelEvent(true)
})
