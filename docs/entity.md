# Entity
Represents a entity within the world, and stored by BeAPI.

# Methods

## getNameTag
```ts
getNameTag(): string
```
Returns the entities nameTag.

## setNameTag
```ts
setNameTag(nameTag: string): void
```
Sets the entities nameTag.

## getId
```ts
getId(): string
```
Returns the id of the entity.

## getVanilla
```ts
getVanilla(): MCEntity
```
Returns the vanilla gametest object of the entity.
Types: *[MCEntity](https://docs.microsoft.com/en-us/minecraft/creator/scriptapi/mojang-minecraft/entity)*

## getRuntimeId
```ts
getRuntimeId(): number
```
Returns the entities runtimeId.

## destroy
```ts
destroy(): void
```
Kills the entity.

## executeCommand
```ts
executeCommand(command: string): ExecuteCommandResponse
```
Executes a command as the entity.
Types: *[ExecuteCommandResponse](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/executecommandresponse.md)*

## getLocation
```ts
getLocation(): Location
```
Returns the location of the entity.
Types: *[Location](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/location.md)*

## getHealth
```ts
getHealth(): Health
```
Returns the health component of the entity.
Types: *[Health](https://github.com/MCBE-Utilities/BeAPI/tree/main/docs/types/health.md)*

## getTags
```ts
getTags(): string[]
```
Returns all of the tags on this entity.

## hasTag
```ts
hasTag(tag: string): boolean
```
Returns boolean if the entity has a specific tag.

## addTag
```ts
addTag(tag: string): boolean
```
Adds a tag to a entity, returns boolean if the entity already has the tag.

## removeTag
```ts
removeTag(tag: string): boolean
```
Removes a tag from a entity, returns boolean if the entity did not already have the tag.