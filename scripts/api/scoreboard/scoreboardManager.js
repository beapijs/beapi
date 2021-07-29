export class scoreboardManager {
    constructor(main) {
        this.main = main
    }

    onEnabled() {
        return
    }

    createObjective(objective, displayname) {
        const command = this.main.getCommandManager().executeCommand(`scoreboard objectives add ${objective} dummy "${displayname}"`)
        const status = command.statusMessage

        return status
    }

    removeObjective(objective) {
        const command = this.main.getCommandManager().executeCommand(`scoreboard objectives remove ${objective}`)
        const status = command.statusMessage

        return status
    }

    setDisplay(objective, display) {
        const command = this.main.getCommandManager().executeCommand(`scoreboard objectives setdisplay ${display} ${objective}`)
        const status = command.statusMessage

        return status
    }

    getObjectives() {
        const command = this.main.getCommandManager().executeCommand(`scoreboard objectives list`)
        const response = command.statusMessage
        const raw = response.split('\n')
        const objectives = []

        for (const string of raw) {
            if (!string.startsWith('§a')) {
                const rawString = string.split(' ')
                objectives.push([rawString[1].replace(':', ''), string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')])
            }
        }

        return objectives
    }

    getObjectiveName(objective) {
        let displayname
        for (const obj of this.getObjectives()) {
            if (obj[0] == objective) {
                displayname = obj[1]
            }
        }

        return displayname
    }
}