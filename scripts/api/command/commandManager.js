export class commandManager {
    constructor(main, minecraft) {
        this.main = main
        this.command = minecraft.Commands
    }

    onEnabled() {
        return
    }


    executeCommand(content) {
        return this.command.run(content)
    }
}