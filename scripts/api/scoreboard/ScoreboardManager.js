import { Commands } from "Minecraft"

class ScoreboardManager {

    /**
     * 
     * @param {any} main  Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled()  Runs when the EventManager is enabled
     * @returns
     */

     onEnabled() {
        return
    }

    /**
     * 
     * @param {String} objective 
     * @param {String} displayname 
     * @returns Status Message of the command
     */

    createObjective(objective, displayname) {
        const command = Commands.run(`scoreboard objectives add ${objective} dummy "${displayname}"`)
        const status = command.statusMessage

        return status
    }

    /**
     * 
     * @param {String} objective 
     * @returns Status Message of the command
     */

    removeObjective(objective) {
        const command = Commands.run(`scoreboard objectives remove ${objective}`)
        const status = command.statusMessage

        return status
    }

    /**
     * 
     * @param {String} objective 
     * @param {String} display 
     * @returns Status Message of the command
     */

    setDisplay(objective, display) {
        const command = Commands.run(`scoreboard objectives setdisplay ${display} ${objective}`)
        const status = command.statusMessage

        return status
    }

    /**
     * 
     * @returns Array of Ojectives
     */

    getObjectives() {
        const command = Commands.run(`scoreboard objectives list`)
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

    /**
     * 
     * @param {String} objective 
     * @returns display of objective
     */

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

export default ScoreboardManager