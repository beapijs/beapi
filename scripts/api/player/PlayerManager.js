import { events } from '../event/EventManager.js'
import { executeCommand } from '../command/executeCommand.js'

class PlayerManager {
  constructor() {
    this.players = new Map()
    events.on('PlayerJoined', (player) => {
      this.players.set(player.name, player)
    })
    events.on('PlayerLeft', (player) => {
      this.players.delete(player.name)
    })
  }
  /**
  * Returns an array of players names.
  * @returns {Array<string>}
  */
  getPlayerNames() {
    return executeCommand('/list').statusMessage.split('\n')[1].split(', ')
  }
  /**
   * Returns an array of player objects.
   * @returns {Array<{name: string, nameTag: string, getExecutableName(): void, setNameTag(content: string): void, getTags(): Array<string>, hasTag(tag: string): Boolean, addTag(tag: string): void, removeTag(tag: string): void, getScore(objective: string): number, getScores(): Array<{objective: string, displayName: string, value: number}>}>}
   */
  getPlayers() {
    return this.players
  }
  /**
   * Returns the given player object
   * @param {string} name 
   * @returns {{name: string, nameTag: string, getExecutableName(): void, setNameTag(content: string): void, getTags(): Array<string>, hasTag(tag: string): Boolean, addTag(tag: string): void, removeTag(tag: string): void, getScore(objective: string): number, getScores(): Array<{objective: string, displayName: string, value: number}>}>}
   */
  getPlayerByName(name) {
    return this.players.get(name)
  }
  /**
   * Updates a player in the player list.
   * @param {string} name 
   * @param {Object} player 
   */
  updatePlayer(name, player) {
    this.players.delete(name)
    this.players.set(name, player)
  }
}
/**
 * @type {import('./player').playerManager}
 */
const playerManager = new PlayerManager()

export {
  playerManager,
}
