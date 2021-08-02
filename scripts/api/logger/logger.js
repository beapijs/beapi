import { Commands } from "Minecraft"

class Logger {

    /**
     * 
     * @param {any} main Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled() Runs when the Logger is enabled
     * @returns
     */

     onEnabled() {
        return
    }

    /**
     * 
     * @param {String} namespace Where the Log information came from
     * @param {String} content Log Information / Message
     * @param {String} target Player Name
     * @returns Log Information to the chat
     */

    info(namespace, content, target)  {
        if (!target) {
            try {
                return Commands.run(`tellraw @a[tag=logs] ~~~ {"rawtext":[{"text":"§7[§bINFO§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        } else {
            try {
                return Commands.run(`tellraw "${target}" ~~~ {"rawtext":[{"text":"§7[§bINFO§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        }
    }

    /**
     * 
     * @param {String} namespace Where the Log information came from
     * @param {String} content Log Information / Message
     * @param {String} target Player Name
     * @returns Log Information to the chat
     */

     error(namespace, content, target)  {
        if (!target) {
            try {
                return Commands.run(`tellraw @a[tag=logs] ~~~ {"rawtext":[{"text":"§7[§4ERROR§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        } else {
            try {
                return Commands.run(`tellraw "${target}" ~~~ {"rawtext":[{"text":"§7[§4ERROR§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        }
    }

    /**
     * 
     * @param {String} namespace Where the Log information came from
     * @param {String} content Log Information / Message
     * @param {String} target Player Name
     * @returns Log Information to the chat
     */

     warn(namespace, content, target)  {
        if (!target) {
            try {
                return Commands.run(`tellraw @a[tag=logs] ~~~ {"rawtext":[{"text":"§7[§6WARN§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        } else {
            try {
                return Commands.run(`tellraw "${target}" ~~~ {"rawtext":[{"text":"§7[§6WARN§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        }
    }

    /**
     * 
     * @param {String} namespace Where the Log information came from
     * @param {String} content Log Information / Message
     * @param {String} target Player Name
     * @returns Log Information to the chat
     */

     success(namespace, content, target)  {
        if (!target) {
            try {
                return Commands.run(`tellraw @a[tag=logs] ~~~ {"rawtext":[{"text":"§7[§2UCCESS§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        } else {
            try {
                return Commands.run(`tellraw "${target}" ~~~ {"rawtext":[{"text":"§7[§2SUCCESS§7] [§d${namespace}§7]: §r${content}"}]}`)
            } catch (error) {}
        }
    }

}

export default Logger