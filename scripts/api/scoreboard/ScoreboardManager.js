import { executeCommand } from '../command/executeCommand.js'

class ScoreboardManager {
    constructor() {

    }
    /**
     * Creates an objective
     * @param {string} objective
     * @param {string} displayname
     */
    createObjective(objective, displayname) {
        executeCommand(`scoreboard objectives add ${objective} dummy "${displayname}"`)
    }
    /**
     * Removes an objective
     * @param {string} objective
     */
    removeObjective(objective) {
        executeCommand(`scoreboard objectives remove ${objective}`)
    }
    /**
     * Displays an objective
     * @param {string} objective
     * @param {string} display
     */
    setDisplay(objective, display) {
        executeCommand(`scoreboard objectives setdisplay ${display} ${objective}`)
    }
    /**
     * Returns all available objectives  
     * @returns {Array<{name: string, displayName: string}>}
     */
    getObjectives() {
        const raw = executeCommand(`scoreboard objectives list`).statusMessage.split('\n')
        const objectives = []
        for (const string of raw) {
            if (!string.startsWith('§a')) {
                const rawString = string.split(' ')
                objectives.push({
                    name: rawString[1].replace(':', ''),
                    displayName: string.replace(`- ${rawString[1].replace(':', '')}: displays as '`, '').replace(`' and is type 'dummy'`, '')
                })
            }
        }
        return objectives
    }
    /**
     * Gets objective by name
     * @param {string} objective
     * @returns {string}
     */
    getObjectiveName(objective) {
        for (const obj of this.getObjectives()) {
            if (obj.name == objective) {
                return obj.displayName
            }
        }
    }
}

const scoreboardManager = new ScoreboardManager()

export {
  scoreboardManager,
}