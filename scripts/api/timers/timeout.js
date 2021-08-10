import { events } from '../event/eventManager.js'

const timeouts = []

/**
 * Sets a timeout at a given Minecraft tick.
 * 1 Seconds equals 20 ticks.
 * @param {function} Function - Callback.
 * @param {number} tick - Ticks to fire at.
 * @returns {object}
 */
function setTimeout(Function, tick) {
  timeouts.unshift({
    callback: Function,
    tick: tick,
  })

  return timeouts[0]
}

/**
 * Clears the given interval.
 * @param {object} interval - Interval object. 
 */
function clearTimeout(interval) {
  for (let i = 0; i < timeouts.length; i++) if (timeouts[i] == interval) return timeouts.splice(i)
}

events.on('tick', (tick) => {
  for (let i = 0; i < timeouts.length; i++) {
    timeouts[i].tick--;
    if (timeouts[i].tick <= 0) {
      timeouts[i].callback()
      timeouts.splice(i)
    }
  }
})

export {
  setTimeout,
  clearTimeout,
}