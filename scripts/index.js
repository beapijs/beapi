import {
    events,
    playerManager,
    commandManager,
    executeCommand,
    log,
    setInterval,
    setTimeout,
    emitter,
} from './api/BeAPI.js'

events.on('PlayerJoined', (player) => {
    log(`${player.getVanilla().name} joined!`)
    player.sendMessage('Hello!')
})

events.on('NameTagChanged', (data) => {
    log(`NameTag Changed for: ${data.target.name} | Old: ${data.old}, New: ${data.new}`)
})

events.on('PlayerLeft', (player) => {
    log(`${player.name} left!`)
})

events.cancelChat = true
events.on('PlayerMessage', (data) => {
    const components = data.sender.getVanilla().getComponents()
    components.forEach((component) => {
        log(component.id)
    })
})

commandManager.enable()
commandManager.registerCommand({
    'command': 'ping',
    'description': 'ping the server',
    'permissionTags': ['staff', 'beanis'],
    'aliases': ['p', 'pg'],
}, (data) => {
    data.sender.executeCommand('give @s diamond')
})