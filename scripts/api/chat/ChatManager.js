import { Commands } from "Minecraft"

class ChatManager {

    /**
     * 
     * @param {any} main Passes the other functions from api.js
     */

    constructor(main) {
        this.main = main
    }

    /**
     * 
     * @function onEnabled() Runs when the Chat Manager is enabled
     * @returns
     */

    onEnabled() {
        return
    }

    /**
     * 
     * @param {String} content Message being broadcasted
     * @param {Array} targets If specified it will only broadcast to those players
     * @returns tellraw 
     */

    broadcastMessage(content, targets) {
        if (!targets) {
            try {
                return Commands.run(`tellraw @a {"rawtext":[{"text":"${content}"}]}`)
            } catch (error) {
                this.main.getLogger().error('ChatManager', `Failed to broadcast message to everyone: §c${error}`)
            }
        } else {
            for (const target of targets) {
                try {
                    return Commands.run(`tellraw "${target}" {"rawtext":[{"text":"${content}"}]}`)
                } catch (error) {
                    this.main.getLogger().error('ChatManager', `Failed to broadcast message to §b${target}: §c${error}`)
                }
            }
        }
    }
}

export default ChatManager