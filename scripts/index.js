import API from "./api/api.js";

class main extends API {
    constructor() {
        super()
        this.start()
    }

    start() {
        this.getEventManager().on('PlayerMessage', (data) => {
            data.canceled = true
            if (data.player.rank == undefined) data.player.rank = '§eGuest§r'
            this.getCommandManager().executeCommand(`tellraw @a {"rawtext":[{"text":"§7[${data.player.rank}§7] §b${data.sender.name}§7: ${data.message}"}]}`)
        })

        this.getEventManager().on('PlayerLeft', (player) => {
        })

        this.getEventManager().on('PlayerJoined', (player) => {
 
        })
    }
}

new main()