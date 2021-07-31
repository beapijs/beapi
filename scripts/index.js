import API from "./api/api.js";

class main extends API {
    constructor() {
        super()
        this.start()
    }

    start() {
        this.getEventManager().on('PlayerMessage', (data) => {
            data.message = 'pe n i s : ' + data.message
        })

        this.getEventManager().on('PlayerLeft', (player) => {
            this.getCommandManager().executeCommand(`say ${player.name} left`)
        })

        this.getEventManager().on('PlayerJoined', (player) => {
            this.getCommandManager().executeCommand(`say ${player.name} Joined, Tags: ${player.tags}`)
        })
    }
}

new main()