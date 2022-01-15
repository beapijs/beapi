import { events } from '../events/EventManager.js'
import type { Interval } from '../@types/BeAPI.i'

const intervals: Interval[] = []

function setInterval(callback: CallableFunction, tick: number): Interval {
  intervals.unshift({
    callback: callback,
    tick: tick,
  })

  return intervals[0]
}

function clearInterval(interval: Interval): void {
  for (let i = 0; i < intervals.length; i++) if (intervals[i] === interval) intervals.splice(i)
}

events.on('tick', (tick) => {
  for (const interval of intervals) if (tick % interval.tick === 0) return interval.callback()
})

export { setInterval, clearInterval }
