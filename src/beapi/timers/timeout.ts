import { events } from '../events/EventManager.js'
import { Interval } from '../../types/BeAPI.i'

const timeouts: Interval[] = []

function setTimeout(callback: CallableFunction, tick: number): Interval {
  timeouts.unshift({
    callback: callback,
    tick: tick,
  })

  return timeouts[0]
}

function clearTimeout(timeout: Interval): void {
  for (let i = 0; i < timeouts.length; i++) if (timeouts[i] == timeout) timeouts.splice(i)
}

events.on('tick', () => {
  for (let i = 0; i < timeouts.length; i++) {
    timeouts[i].tick--
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
