export class chatManager {
    constructor(main, minecraft) {
        this.main = main
    }

    onEnabled() {
        return
    }

    broadcastMessage(content) {
        return this.main.getCommandManager().executeCommand(`tellraw @a {"rawtext":[{"text":"${content}"}]}`)
    }

}