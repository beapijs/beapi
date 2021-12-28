# EventManager
BeAPI's event management methods.

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

## getEvents
```ts
getEvents(): Map<string, any>
```
Returns all registered events.

# Event Values

```ts
  tick: [number]
  PlayerJoin: [Player]
  PlayerLeft: [Player]
  PlayerMessage: [PlayerMessage]
  ChatCommand: [ChatCommand]
  RawSocketMessage: [RawSocketMessage]
  NameTagChanged: [NameTagChanged]
  EntityCreate: [Entity]
  EntityDestroyed: [Entity]
  Explosion: [Explosion]
  OldEvent: [any]
  BlockDestructionStarted: [BlockDestructionStarted]
  BlockDestructionStopped: [BlockDestructionStopped]
  BlockDestroyed: [BlockDestroyed]
  BlockPlaced: [BlockPlaced]
  EntityAttacked: [EntityAttacked]
```