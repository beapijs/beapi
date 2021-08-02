import { Commands } from "Minecraft"

class PlayerManager {

    /**
     * 
     * @param {any} main Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled() Runs when the Player Manager is enabled
     * @returns
     */

    onEnabled() {
        return
    }

    /**
     * 
     * @param {String} target Player Name
     * @returns Player Tags
     */

    getTags(target) {
        const tags = []
        try {
            const command = Commands.run(`tag "${target}" list`)
            const raw = command.statusMessage.split(' ')
            for (const string of raw) {
                if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', ''))
            }
        } catch (error) {
            this.main.getLogger().error(`PlayerManager`, error)
        }
        return tags
    }

    kick(target, reason) {
    }

    ban(target, reason, length) {
    }

    /**
     * 
     * @param {String} target Player Name
     * @param {String} tag Tag
     * @returns Boolean
     */

    hasTag(target, tag) {
        let value = false
        const tags = this.getTags(target)
        for (const key of tags) {
            if (key == tag) value = true
        }
        return value
    }

    /**
     * 
     * @param {String} target Player Name
     * @returns Player's Rank
     */

    getRank(target) {
        let rank
        const tags = this.getTags(target)
        for (const tag of tags) {
            if (tag.startsWith('rank:')) {
                rank = tag.replace('rank:', '')
            }
        }
        return rank
    }

    /**
     * 
     * @param {Sring} player Player Name
     * @param {String} objective Objective
     * @returns Number
     */

    getScore(player, objective) {
        let score = 0
        try {
            const response = Commands.run(`scoreboard players list "${player}"`).statusMessage
            const objectiveName = this.main.getScoreboardManager().getObjectiveName(objective)
            const raw = response.split('\n')
            for (const string of raw) {
                if (!string.startsWith("§a") && string.includes(objectiveName)) {
                    const rawString = string.split(' ').reverse()
                    score = parseInt(rawString[1])
                }
            }
        } catch (error) {
            this.main.getLogger().error('PlayerManager', error)
        }
        return score
    }

    /**
     * 
     * @param {String} target Player Name
     * @returns Array of scores
     */

    getScores(target) {
        let scores = []
        const objectives = this.main.getScoreboardManager().getObjectives()
        for (const key of objectives) {
            const score = this.getScore(target, key)
            const object = {
                objective: key[0],
                displayName: key[1],
                value: score
            }
            scores.push(object)
        }

        return scores
    }
}

export default PlayerManager