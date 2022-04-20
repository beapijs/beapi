import { Client, CommandTypes } from 'beapi-core'

const client = new Client()

client.commands.register('ping', 'Ping BeAPI script.', (sender) => {
  sender.sendMessage('§ePong!§r')
})

client.commands.register(
  'aliastest',
  'Test command aliases,',
  {
    aliases: ['at'],
  },
  (sender) => {
    sender.sendMessage('Hello World!')
  },
)

client.commands.register(
  'argtest',
  'Test argument system.',
  {
    string: CommandTypes.String,
    optionalNumber: [CommandTypes.Number, true],
    optionalBoolean: [CommandTypes.Boolean, true],
  },
  (sender, args) => {
    sender.sendMessage(`${args.string} ${args.optionalNumber} ${args.optionalBoolean}`)
  },
)

client.commands.register(
  'aliasargtest',
  'Test argument system with aliases.',
  {
    aliases: ['aat'],
  },
  {
    string: CommandTypes.String,
    optionalNumber: [CommandTypes.Number, true],
    optionalBoolean: [CommandTypes.Boolean, true],
  },
  (sender, args) => {
    sender.sendMessage(`${args.string} ${args.optionalNumber} ${args.optionalBoolean}`)
  },
)
