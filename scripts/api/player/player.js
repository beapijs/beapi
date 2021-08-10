import { executeCommand } from '../command/executeCommand.js'
import { events } from '../event/eventManager.js'
import { scoreboardManager } from '../scoreboard/scoreboardManager.js'

class Player {
  constructor(player) {
    this.name = player.name
    this.vanilla = player
  }
  /**
   * Returns the vanilla player class.
   * @returns {{id: string, isSneaking: boolean, location: any, name: string, nameTag: string, velocity: any}} // TODO: Add methods
   */
  getVanilla() {
    return this.vanilla
  }
  /**
   * Gets the players executable name.
   * @returns {string}
   */
  getExecutableName() {
    if (this.name == undefined || this.name != this.vanilla.nameTag) return this.vanilla.nameTag
    if (this.vanilla.nameTag == undefined) return "Unkown"

    return this.name
  }
  /**
   * Returns the players nametag
   * @returns {string}
   */
  getNameTag() {
    return this.vanilla.nameTag
  }
  /**
   * Changes the nameTag of the player.
   * @param {string} content 
   */
  setNameTag(content) {
    events.emit('NameTagChanged', {
      target: this,
      old: this.vanilla.nameTag,
      new: content,
    })
    this.vanilla.nameTag = content
  }
  /**
   * Gets all the tags found on the player.
   * @returns {Array<string>}
   */
  getTags() {
    const raw = executeCommand(`tag "${this.getExecutableName()}" list`).statusMessage.split(' ')
    const tags = []
    for (const string of raw) {
      if (string.startsWith("§a")) tags.push(string.replace('§a', '').replace('§r', '').replace(',', ''))
    }

    return tags
  }
  /**
   * Returns true or false if the player has a specific tag.
   * @param {string} tag 
   * @returns {Boolean} 
   */
  hasTag(tag) {
    const tags = this.getTags()
    if (!tags.includes(tag)) return false

    return true
  }
  /**
   * Add a tag from the player.
   * @param {string} tag 
   */
  addTag(tag) {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tag @s add "${tag}"`)

    return
  }
  /**
   * Remove a tag from the player.
   * @param {string} tag 
   */
  removeTag(tag) {
    executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ tag @s remove "${tag}"`)

    return
  }
  /**
   * Gets score of a player objective.
   * @param {string} objective
   * @returns {number}
   */
  /**
   * Executes a command as the player.
   * @param {string} command 
   */
  executeCommand(command) {
    return executeCommand(`execute "${this.getExecutableName()}" ~ ~ ~ ${command}`).statusMessage
  }
  getScore(objective) {
    const raw = executeCommand(`scoreboard players list "${this.getExecutableName()}"`).statusMessage.split('\n')
    const objectiveName = scoreboardManager.getObjectiveName(objective)
    let score
    for (const string of raw) {
      if (!string.startsWith("§a") && string.includes(objectiveName)) {
        const rawString = string.split(' ').reverse()
        score = parseInt(rawString[1])
      }
    }

    return score
  }
  /**
   * Gets all of players current scores.
   * @returns {Array<{objective: string, displayName: string, value: number}>}
   */
  getScores() {
    const scores = []
    const objectives = scoreboardManager.getObjectives()
    for (const obj of objectives) {
      const score = this.getScore(obj.name)
      scores.push({
        objective: obj.name,
        displayName: obj.displayName,
        value: score
      })
    }

    return scores
  }
  /**
   * Returns the players current location.
   * @returns {{x: number, y: number, z: number}}
   */
  getLocation() {
    const pos = this.vanilla.location

    return {
      x: Math.floor(pos.x),
      y: Math.floor(pos.y - 1),
      z: Math.floor(pos.z),
    }
  }
  /**
   * Get the health component of the player.
   * @returns {{current: number, id: string, value: number, resetToDefaultValue(): void, resetToMaxValue(): void, resetToMinValue(): void, setCurrent(value: number): void}}
   */
  getHealthComponent() {
    return this.vanilla.getComponent('health')
  }
  /**
   * Send the player a message.
   * @param {string} message 
   */
  sendMessage(message) {
    this.executeCommand(`tellraw @s {"rawtext":[{"text":"${message}"}]}`)
  }
}

export {
  Player,
}