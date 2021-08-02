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
     * @function onEnabled()  Runs when the Scoreboard Manager is enabled
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
        try {
            return Commands.run(`scoreboard objectives add ${objective} dummy "${displayname}"`).statusMessage
        } catch (error) {
            return this.main.getLogger().error(`ScoreboardManager`, error)
        }
    }

    /**
     * 
     * @param {String} objective 
     * @returns Status Message of the command
     */

    removeObjective(objective) {
        try {
            return Commands.run(`scoreboard objectives remove ${objective}`).statusMessage
        } catch (error) {
            return this.main.getLogger().error(`ScoreboardManager`, error)
        }
    }

    /**
     * 
     * @param {String} objective 
     * @param {String} display 
     * @returns Status Message of the command
     */

    setDisplay(objective, display) {
        try {
            return Commands.run(`scoreboard objectives setdisplay ${display} ${objective}`).statusMessage
        } catch (error) {
            return this.main.getLogger().error(`ScoreboardManager`, error)
        }
    }

    /**
     * 
     * @returns Array of Ojectives
     */

    getObjectives() {
        try {
            const response = Commands.run(`scoreboard objectives list`).statusMessage
            const raw = response.split('\n')
            const objectives = []

            for (const string of raw) {
                if (!string.startsWith('§a')) {
                    const rawString = string.split(' ')
                    objectives.push([rawString[1].replace(':', ''), string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')])
                }
            }
            return objectives
        } catch (error) {
            return this.main.getLogger().error(`ScoreboardManager`, error)
        }
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