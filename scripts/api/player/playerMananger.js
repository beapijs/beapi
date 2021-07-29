export class playerManager {
    constructor(main, minecraft) {
        this.main = main
    }

    onEnabled() {
        return
    }

    getTags(target) {
        try {
            const command = this.plugin.getCommandManager().executeCommand(`tag "${target}" list`)
            const raw = command.statusMessage.split(' ')
            const tags = []
            for (const string of raw) {
                if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', ''))
            }

            return tags
        } catch (error) {
            this.main.getLogger().error(error)
        }
    }

    kick(target, reason) {
        if (!reason) reason = `No reason was given`
        this.main.getCommandManager().executeCommand(`kick "${target}" ${reason}`)
    }

    ban(target, reason, length) {

    }

    hasTag(target, tag) {
        let value = false
        const tags = this.getTags(target) 
        for (const key of tags) {
            if (key == tag) value = true
        }
        return value
    }

    getRank(target) {
      const tags = this.getTags(target)
      let rank
      for (const tag of tags) {
          if (tag.startsWith('rank:')) {
              rank = tag.replace('rank:', '')
          }
      }
      return rank
    }

    getScore(player, objective) {
        const command = this.plugin.getCommandManager().executeCommand(`scoreboard players list "${player}"`)
        const response = command.statusMessage
        const objectiveName = this.plugin.getScoreboardManager().getObjectiveName(objective)
        let score 
        const raw = response.split('\n')
        for (const string of raw) {
          if (!string.startsWith("§a") && string.includes(objectiveName)) {
            const rawString = string.split(' ').reverse()
            score = parseInt(rawString[1])
          }
        }
      }

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

    getPlayers() {
        let players = []
        var command = this.main.getCommandManager().executeCommand(`list`)
        var response = command.statusMessage
        var raw = response.split('\n')
        var playersString = raw[1].split(', ')

        for (const name of playersString) {
            const player = {
                name: name,
                nickname: undefined,
                rank: this.getRank(name),
                tags: this.getTags(name),
                scores: this.getScores(name)
            }
            players.push(player)
        }

        return players
    }

    getPlayer(target) {
        for (const player of this.getPlayers()) {
            if (player.name == target) return player
        }
    }
}

