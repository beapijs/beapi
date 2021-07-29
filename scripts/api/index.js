import { logger } from "./utils/logger.js"
import { commandManager } from "./command/commandManager.js"
import { eventManager } from "./event/eventManager.js"
import { playerManager } from "./player/playerMananger.js"
import { scoreboardManager } from "./scoreboard/scoreboardManager.js"
import { chatManager } from "./chat/chatManager.js"
import * as Minecraft from "Minecraft"

export default class Main {
    constructor() {
      this.logger = new logger(this)
      this.commandManager = new commandManager(this, Minecraft)
      this.eventManager = new eventManager(this, Minecraft)
      this.playerManager = new playerManager(this, Minecraft)
      this.scoreboardManager = new scoreboardManager(this, Minecraft)
      this.chatManager = new chatManager(this, Minecraft)
      this.onEnabled()
    }

    onEnabled() {
        this.logger.onEnabled()
        this.commandManager.onEnabled()
        this.eventManager.onEnabled()
        this.playerManager.onEnabled()   
        this.scoreboardManager.onEnabled()
        this.commandManager.onEnabled()
    }
    
    getLogger() {
        return this.logger
    }

    getCommandManager() {
        return this.commandManager
    }

    getEventManager() {
        return this.eventManager
    }

    getPlayerManager() {
        return this.playerManager
    }

    getScoreboardManager() {
        return this.scoreboardManager
    }

    getChatManager() {
        return this.chatManager
    }
}

new Main()