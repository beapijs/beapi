import { client } from 'beapi-core'

client.commands.register(
  {
    name: 'ping',
    description: 'Ping gametest scripts.',
    aliases: ['p'],
  },
  (data) => {
    data.sender.sendMessage('§ePong!')
  },
)
