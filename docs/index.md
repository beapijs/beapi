## Basic Info
- Adds more methods to the vanilla scripting/gametest API.

## index.js
- This is where your source code will go. index.js can be found in the scripts folder.

```js
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

```

# Using BeAPI
- [Events](https://github.com/xFallen54x/BeAPI/blob/main/docs/events.md)
- [PlayerManager](https://github.com/xFallen54x/BeAPI/blob/main/docs/playerManager.md)
- [CommandManager](https://github.com/xFallen54x/BeAPI/blob/main/docs/commandManager.md)

## setInterval & setTimeout
- Sets an interval or a timeout using ticks.
```js
import {
    setInterval,
    setTimeout,
} from './api/BeAPI.js'

setInterval(() => {
    // Executes every 10 ticks
    // Code here
}, 10)

setTimeout(() => {
    // Waits 10 ticks till it executes
    // Code here
}, 10)
```
