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
     * @function onEnabled() Runs when the EventManager is enabled
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
            try { Commands.run(content) } catch (error) { }
        } else {
            try { Commands.run(`execute "${target}" ~ ~ ~ ${content}`) } catch (error) { }
        }
    }



}

export default CommandManager