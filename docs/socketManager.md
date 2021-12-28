# SocketManager
BeAPI's socket management methods.
The socket manager is a very useful tool for websocket type communication between BeAPI and [BeRP](https://github.com/NobUwU/BeRP). This allows you to send data back in forth between both of the tools. Since BeRP uses [NodeJS](https://nodejs.org/), you can send and receive anything that you desire. BeAPI has default events built directly inside. BeRP also was support for these default events. To create your own events, you must listen on the "Message" event on both BeAPI and BeRP, then parse your data from there.

# Methods

## on
```ts
on(event: string, callback: (data: any) => void): void
```
Fires when specified event is fired.

## emit
```ts
emit(event: string, data: any): void
```
Emits custom event with any data.

## getSocketRequests
```ts
getSocketRequests(): Map<string, any>
```
Returns all socket requests.

## sendMessage
```ts
sendMessage(message: JsonRequest): void
```
Sends a json message through the socket.
Types: *[JsonRequest](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/jsonrequest.md)*

# SocketValues Values

```ts
  Message
  EnableRequest
  DisableRequest
  Heartbeat
  CommandRequest
  PlayerMessage
  PlayerRequest
  UpdateNameTag
  EntityCreate
  EntityDestroyed
  EntityRequest
  UpdateEntity
  InventoryRequest
  ToggleCommands
  ToggleMessages
  GetRequests
  TagsRequest
  GetPlayers
  GetEntities
  ScoreRequest
  Explosion
```