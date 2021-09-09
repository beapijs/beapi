import { events } from '../event/EventManager.js'
import { emitter } from '../emitter/emitter.js'
import {
  version,
  mcbe
} from '../version.js'

class CommandManager extends emitter {
  constructor() {
    super()
    this.prefix = "-"
    this.enabled = false
    this.commands = new Map()
    this._chatCheck()
    this._defaultCommands()
  }
  /**
   * @private
   */
  _chatCheck() {
    events.on('CommandExecuted', (data) => {
      const command = this._parseCommand(data.command)
      if (!this.commands.has(command.command)) return data.sender.sendMessage("§cThis command dosent exsist!")
      /**
       * @type {import('./command').command}
       */
      const commandData = this.commands.get(command.command)
      events.emit('PlayerExecutedCommand', {
        sender: data.sender,
        command: command.command,
        args: command.args,
      })
      if (commandData.options.permissionTags == undefined) return commandData.execute({
        sender: data.sender,
        args: command.args,
      })
      const tags = data.sender.getTags()
      const found = tags.some(r => commandData.options.permissionTags.indexOf(r) >= 0)
      if (!found) return data.sender.sendMessage('§cYou dont have permission to use this command!')

      return commandData.execute({
        sender: data.sender,
        args: command.args,
      })
    })
  }
  /**
   * @private
   * @param {string} content 
   * @returns {{command: string, args: Array<string>}}
   */
  _parseCommand(content) {
    const command = content.replace(this.prefix, '').split(' ')[0]
    const args = content.replace(`${this.prefix}${command} `, '').split(' ')

    return {
      command: command,
      args: args,
    }
  }
    /**
   * @private
   */
  _defaultCommands() {
    this.registerCommand({
      'command': 'help',
      'description': 'Displays a list of commands on the server.',
      'aliases': ['h'],
    }, (data) => {
      data.sender.sendMessage('§bShowing all Available Commands:')
      this.commands.forEach((command) => {
        if (!command.showInList) return
        data.sender.sendMessage(` §7${this.prefix}${command.options.command}§r §o§8- ${command.options.description}§r`)
      })
    })
    this.registerCommand({
      'command': 'about',
      'description': 'Shows info about the server.',
      'aliases': ['ab'],
    }, (data) => {
      data.sender.sendMessage(`§7This server is using §9BeAPI v${version}§7 for §aMinecraft: Bedrock Edition v${mcbe}§7.`)
    })
  }
  setPrefix(prefix) {
    this.prefix = prefix
    events.cmdPrefix = prefix
  }
  enable() {
    this.enabled = true
    events.cmdEnabled = true
  }
  registerCommand(options, Callback) {
    this.enable()
    if (this.commands.has(options.command)) return
    this.commands.set(options.command, {
      options: options,
      showInList: true,
      execute: Callback,
    })
    if (options.aliases == undefined) return
    for (const aliases of options.aliases) {
      this.commands.set(aliases, {
        options: options,
        showInList: false,
        execute: Callback,
      })
    }
  }
}

/**
 * @type {import('./command').commandManager}
 */
const commandManager = new CommandManager()

export {
  commandManager,
}