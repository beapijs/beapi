import { Commands } from "Minecraft"

class CommandManager {

    /**
     * 
     * @param {any} main Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled() Runs when the Command Manager is enabled
     * @returns
     */

     onEnabled() {
        return
    }

    /**
     * 
     * @function executeCommand() Runs a command, if a player is specified it will execute the command on them
     * @param {String} content Command
     * @param {String} target Playername
     * @returns
     */

    async executeCommand(content, target) {
        if (!target) {
            try { 
                return Commands.run(content) 
            } catch (error) { 
                this.main.getLogger().error(`CommandManager`, error)
            }
        } else {
            try { 
                return Commands.run(`execute "${target}" ~ ~ ~ ${content}`) 
            } catch (error) { 
                this.main.getLogger().error(`CommandManager`, error, target)
            }
        }
    }



}

export default CommandManager