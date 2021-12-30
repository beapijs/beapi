import { commands } from 'beapi-core'

commands.registerCommand(
  {
    command: 'ping',
    description: 'Ping gametest scripts.',
    aliases: ['p'],
  },
  (data) => {
    data.sender.sendMessage('§ePong!')
  },
)
