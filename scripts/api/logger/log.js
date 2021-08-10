import { Commands } from 'Minecraft'

/**
 * Log a Message.
 * @param {string} content
 */
function log(...content) {
  try {
    Commands.run(`tellraw @a {"rawtext":[{"text":"${content}"}]}`)
  } catch (error) {
    Commands.run(`tellraw @a {"rawtext":[{"text":"${error}"}]}`)
  }
}

export {
  log,
}