import { Commands } from "Minecraft"

class WorldManager {

    /**
     * 
     * @param {any} main Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled() Runs when the EventManager is enabled
     * @returns
     */

    onEnabled() {
        return
    }

    /**
     * 
     * @function getPlayers() Gets all players currently in the world
     * @returns An array of Player Object's
     */

    getPlayers() {
        let players = []
        try {
            let response = Commands.run(`list`).statusMessage
            let raw = response.split('\n')
            let playersString = raw[1].split(', ')

            for (const name of playersString) {
                const tags = this.main.getPlayerManager().getTags(name)
                const scores = this.main.getPlayerManager().getScores(name)
                const rank = this.main.getPlayerManager().getRank(name)

                const player = {
                    name: name,
                    nickname: undefined,
                    rank: rank,
                    tags: tags,
                    scores: scores
                }
                players.push(player)
            }
        } catch (e) { }

        return players
    }

    /**
     * 
     * @param {String} target Player Name
     * @returns Player Object
     */

    getPlayer(target) {
        let player
        for (const key of this.getPlayers()) {
            if (player.name == target) player = key
        }
        return player
    }
}

export default WorldManager