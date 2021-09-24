import { executeCommand, commands, events, world, } from './beapi/BeAPI.js';
events.on('PlayerJoin', (player) => {
    executeCommand(`say ${player.getName()}`);
});
events.on('PlayerLeft', (player) => {
    executeCommand(`say ${player.getName()}`);
});
events.on('PlayerMessage', (data) => {
    if (data.message == 'cancel')
        return data.cancelEvent(true);
    if (data.message == 'ticks') {
        data.sender.sendMessage(`${world.getTicks()}`);
        data.cancelEvent(true);
    }
});
commands.enabled = true;
commands.registerCommand({
    command: 'ping',
    aliases: ["p"],
    description: "Ping the server!",
}, (data) => {
    bean(data.sender);
});
function bean(player) {
    setInterval(() => {
        const q = player.getVanilla().getComponent('minecraft:movement');
        q.setCurrent('999');
    }, 1);
}
