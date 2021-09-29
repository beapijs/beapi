import { entities, commands, } from './beapi/BeAPI.js';
commands.registerCommand({
    command: "test",
    description: "test",
}, (res) => {
    const entity = entities.getEntityByRuntimeId(parseInt(res.args[0]));
    const command = entity.executeCommand('give @a diamond 64');
});
