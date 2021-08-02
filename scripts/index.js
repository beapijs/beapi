import API from "./api/api.js";

class main extends API {
    constructor() {
        super()
        this.start()
    }

    start() {
        this.getEventManager().on('BeforeMessage', (data) => {
            data.canceled = true
            if (data.player.rank == undefined) data.player.rank = '§eGuest§r'
            this.getCommandManager().executeCommand(`tellraw @a {"rawtext":[{"text":"§7[${data.player.rank}§7] §b${data.sender.name}§7: ${data.message}"}]}`)
        })

        this.getEventManager().on('PlayerLeft', (player) => {
            this.getLogger().info('PlayerLeft', player.name)
        })

        this.getEventManager().on('PlayerJoined', (player) => {
            this.getLogger().info('PlayerJoined', player.name)
        })

        this.getEventManager().on('Tick', () => {
             const entities = []
             for (const entity of this.getWorldManager().getEntitiesAtPos([0, 5, 0])) {
                 entities.push(entity.nameTag)
             }
             this.getLogger().info('ExamplePlugin', entities)
        })
    }
}

new main()