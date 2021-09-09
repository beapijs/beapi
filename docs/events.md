# EventManager

## Referencing
```js
import {
    events,
} from './api/BeAPI.js'
```

## on Event
- Runs when an event is fired
```js
events.on('PlayerMessage')
```

## once Event
- Runs once when an event is fired
```js
events.on('PlayerMessage')

```
## emit Event
- Fires an event
```js
events.emit('<custom_event>')
```

# Default Events

## PlayerMessage
- Fires when a player sends a message to the chat

## CommandExecuted
- Fires when a custom BeAPI command is executed

## PlayerJoined
- Fires when a player joins the game

## PlayerLeft
- Fires when a player leaves the game

## tick
- Fires every minecraft tick



