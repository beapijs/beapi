import {
    events,
    playerManager,
    commandManager,
    executeCommand,
    log,
    setInterval,
    setTimeout,
    emitter,
    socket,
} from './api/BeAPI.js'

events.cancelChat = true
events.on('PlayerMessage', (data) => {

})