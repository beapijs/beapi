import {
  events,
} from '../beapi/BeAPI.js'

events.on("BlockPlaced", (data) => {
  data.cancelEvent()
})

events.on("BlockDestroyed", (data) => {
  data.cancelEvent()
})
