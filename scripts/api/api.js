import EventManager from "./event/EventManager.js"
import CommandManager from "./command/CommandManager.js"
import WorldManager from "./world/WorldManager.js"
import ScoreboardManager from "./scoreboard/ScoreboardManager.js"
import PlayerManager from "./player/PlayerManager.js"
import ChatManager from "./chat/ChatManager.js"
import Logger from "./logger/logger.js"

class API {
    constructor() {
        this.CommandManager = new CommandManager(this)
        this.EventManager = new EventManager(this)
        this.WorldManager = new WorldManager(this)
        this.ScoreboardManager = new ScoreboardManager(this)
        this.PlayerManager = new PlayerManager(this)
        this.ChatManager = new ChatManager(this)
        this.Logger = new Logger(this)
        this.onEnabled()
    }

    onEnabled() {
        this.CommandManager.onEnabled()
        this.EventManager.onEnabled()
        this.WorldManager.onEnabled()
        this.ScoreboardManager.onEnabled()
        this.PlayerManager.onEnabled()
        this.ChatManager.onEnabled()
        this.Logger.onEnabled()
    }

    /**
     * 
     * @function getEventManager() 
     * @returns Event Manager 
     */

    getEventManager() {
        return this.EventManager
    }

    /**
     * 
     * @function getCommandManager()
     * @returns Command Manager
     */

     getCommandManager() {
        return this.CommandManager
    }

    /**
     * 
     * @function getWorldManager()
     * @returns World Manager 
     */

     getWorldManager() {
        return this.WorldManager
    }

    /**
     * 
     * @function getScoreboardManager()
     * @returns Scoreboard Manager 
     */

     getScoreboardManager() {
        return this.ScoreboardManager
    }

    /**
     * 
     * @function getPlayerManager()
     * @returns Player Manager 
     */

     getPlayerManager() {
        return this.PlayerManager
    }

    /**
     * 
     * @function getChatManger()
     * @returns Chat Manager
     */

    getChatManager() {
        return this.ChatManager
    }

    /**
     * 
     * @function getLogger()
     * @returns Logger
     */

    getLogger() {
        return this.Logger
    }


}

export default API