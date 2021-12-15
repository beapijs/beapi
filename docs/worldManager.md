# WorldManager
BeAPI's world manager methods.

**Note: the worldManager is still in development.**

# Methods

## getTicks
```ts
getTicks(): number
```
Returns the current ticks of the world.

## sendMessage
```ts
sendMessage(message: string): void
```
Sends a message to all of the players on the world.

## spawnEntity
```ts
spawnEntity(entity: string, pos: Location, name?: string): Entity
```
Spawns an entity at the given loaction and returns the entities BeAPI object.
Types: *[Location](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/location.md), [Entity](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/entity.md)*