export class logger {
    constructor(main) {
        this.main = main
        this.red = '§4'
        this.green = '§2'
        this.grey = '§7'
        this.yellow = '§g'
        this.orange = '§6'
        this.lightblue = '§b'
        this.magneta = '§5'
        this.reset = '§r'
    }

    onEnabled() {
        return 
    }

    info(content, target) {
        if (target) {
            return this.main.getCommandManager().executeCommand(`execute "${target}" ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.lightblue}INFO${this.reset}] ${this.grey}${content}"}]}`)
        } else return this.main.getCommandManager().executeCommand(`execute @a[tag=log] ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.lightblue}INFO${this.reset}] ${this.grey}${content}"}]}`)
    }
    success(content, target) {
        if (target) {
            return this.main.getCommandManager().executeCommand(`execute "${target}" ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.green}SUCCESS${this.reset}] ${this.grey}${content}"}]}`)
        } else return this.main.getCommandManager().executeCommand(`execute @a[tag=log] ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.green}SUCCESS${this.reset}] ${this.grey}${content}"}]}`)
    }
    error(content, target) {
        if (target) {
            return this.main.getCommandManager().executeCommand(`execute "${target}" ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.red}ERROR${this.reset}] ${this.grey}${content}"}]}`)
        } else return this.main.getCommandManager().executeCommand(`execute @a[tag=log] ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.red}ERROR${this.reset}] ${this.grey}${content}"}]}`)
    }
    warn(content, target) {
        if (target) {
            return this.main.getCommandManager().executeCommand(`execute "${target}" ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.yellow}WARN${this.reset}] ${this.grey}${content}"}]}`)
        } else return this.main.getCommandManager().executeCommand(`execute @a[tag=log] ~~~ tellraw @s {"rawtext":[{"text":"${this.grey}${time()}${this.reset}: [${this.yellow}WARN${this.reset}] ${this.grey}${content}"}]}`)
    }
}

function time() {
    var today = new Date();
    return `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
};