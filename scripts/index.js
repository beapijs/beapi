import api from './api/index.js'

class test extends api {
    constructor() {
        super()
        this.onEnabled()
    }

    onEnabled() {
        this.getEventManager().on('PlayerMessage', (data) => {
            const user = this.getPlayerManager().getPlayer(data.sender.name)
            if (user == undefined) return this.getLogger().error(`Failed to send message: User undefined`, data.sender.name)
            this.getChatManager().broadcastMessage(`[${user.rank}] ${user.name}: ${data.message}`)
        })

        this.eventManager.on('PlayerJoined', (data) => {
            this.logger.info(`Welcome ${data.name}`)
        })

        
    }
}

new test()