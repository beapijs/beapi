import { events } from '../event/EventManager.js'

const intervals = []

/**
 * Sets an interval at a given Minecraft tick.
 * 1 Seconds equals 20 ticks.
 * @param {function} Function - Callback.
 * @param {number} tick - Ticks to fire at.
 * @returns {object}
 */
function setInterval(Function, tick) {
  intervals.unshift({
    callback: Function,
    tick: tick,
  })

  return intervals[0]
}

/**
 * Clears the given interval.
 * @param {setInterval()} interval - Interval object. 
 */
function clearInterval(interval) {
  for (let i = 0; i < intervals.length; i++) if (intervals[i] === interval) return intervals.splice(i)
}

events.on('tick', (tick) => {
  for (let i = 0; i < intervals.length; i++) if (tick % intervals[i].tick == 0) return intervals[i].callback()
})

export {
  setInterval,
  clearInterval,
}